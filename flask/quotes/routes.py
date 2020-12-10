from flask import render_template, url_for, flash, redirect, request, abort
from quotes import app, db, bcrypt, moment
from quotes.forms import RegistrationForm, LoginForm, PostForm
from quotes.models import User, Post
from flask_login import login_user, current_user, logout_user, login_required
import random



@app.route('/')
def home():
    data = {'title': 'Random Quotes'}
    randomPost = Post.query.all()
    if randomPost == []:
        data['quote'] = 'default'
        data['author'] = 'prevent'
        data['user'] = 'error'
        data['link'] = '#'

        return render_template('home.html', data=data)
    randomPost = random.choice(randomPost)
    data['quote'] = randomPost.quotes
    data['author'] = randomPost.writer
    data['user'] = randomPost.author.username
    data['link'] = 'foobar'
    return render_template('home.html', data=data)


@app.route('/ajax')
def ajax():
    data = {'title': 'Random Quotes'}
    randomPost = Post.query.all()
    randomPost = random.choice(randomPost)
    data['quote'] = randomPost.quotes
    data['author'] = randomPost.writer
    data['user'] = randomPost.author.username
    data['link'] = url_for('post_user',username=data['user'])
    return data


@app.route('/timeline', methods=['GET', 'POST'])
def timeline():
    data = {'title': 'Timeline','legend': 'Post Something'}
    form = PostForm()
    if form.validate_on_submit():
        if current_user.is_authenticated:
            post = Post(quotes=form.quotes.data, writer=form.author.data,
                    user_id=current_user.id)
            db.session.add(post)
            db.session.commit()
            return redirect(url_for('timeline'))
        return redirect(url_for('login'))
    data['page'] = request.args.get('page', 1, type=int)
    data['posts'] = Post.query.order_by(Post.date_posted.desc()).\
            paginate(page=data['page'], per_page=5)
    return render_template('timeline.html', data=data, form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    data = {'title': 'Register'}
    form = RegistrationForm()
    if form.validate_on_submit():
        hash_password = bcrypt.generate_password_hash(form.password.data).\
                decode('utf-8')
        user = User(username=form.username.data, email=form.email.data,
                password=hash_password)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect(url_for('timeline'))
    return render_template('register.html', data=data, form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    data = {'title': 'Login'}
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password,
                form.password.data):
            login_user(user, remember=form.remember.data)
            return redirect(url_for('timeline'))
        else:
            flash('Login Fail', 'danger')
    return render_template('login.html', data=data, form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route('/post/<int:post_id>/delete', methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    return redirect(url_for('timeline'))


@app.route('/post/<int:post_id>/update', methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    data = {'title': 'Update Post'}
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.quotes = form.quotes.data
        post.writer = form.author.data
        db.session.commit()
        return redirect(url_for('timeline'))
    elif request.method == 'GET':
        data['legend'] = 'Update Post'
        form.quotes.data = post.quotes
        form.author.data = post.writer
    return render_template('timeline.html', data=data, form=form,
            post_id=post.id)


@app.route('/post/<username>')
def post_user(username):
    data = {'title': f'{username} Post'}
    id = User.query.filter_by(username=username).first_or_404().id
    data['page'] = request.args.get('page', 1, type=int)
    data['posts'] = Post.query.order_by(Post.date_posted.desc()).\
            filter_by(user_id=id).paginate(page=data['page'], per_page=5)
    data['legend'] = data['title']
    return render_template('user_post.html', data=data)
