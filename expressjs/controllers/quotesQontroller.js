const User = require('../models/dbHelper');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { requireAuth, checkUser, currentUser } = require('../middleware/authMiddleware');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'foobar', {
    expiresIn: maxAge
  });
}



module.exports.home = (req, res) => {
  User.random()
    .then(user => {
      random = user[Math.floor(Math.random() * user.length)];
      random.link = '/post/'+random.user;
      random.title = 'Home';
      random.username = random.user;
      delete random.user;
      res.render('home', random);
    });
}

module.exports.ajax = (req, res) => {
  User.random()
    .then(user => {
      random = user[Math.floor(Math.random() * user.length)];
      random.link = '/post/'+random.user;
      res.send(random);
    });
}

module.exports.post = (req, res) => {
  const data = {
    title:'Home',
    author:'',
    quotes:'',
    username: req.params.username,
    moment:moment,
    currentUser:currentUser,
    cookies: req.cookies.login,
  };
  User.quotes_post(req.params.username)
    .then(user => {
      data.query = user;
      res.render('post', data);
    })
}

module.exports.timeline_get = (req,res) => {
  const data = {
    title:'Timeline',
    author:'',
    quotes:'',
    moment:moment,
    currentUser:currentUser,
    cookies: req.cookies.login,
  };
  User.quotes()
    .then(user => {
      data.query = user;
      return res.render('timeline', data);
    })
};

module.exports.timeline_post = (req,res) => {
  const data = {
    title:'Timeline',
    user: currentUser(req.cookies.login),
    cookies: req.cookies.login,
    currentUser:currentUser,
    moment:moment,
    author: req.body.author,
    quotes: req.body.quotes,
  };
  const { author, quotes} = req.body
  if(!author || !quotes){
    User.quotes()
      .then(user => {
        data.query = user;
        return res.render('timeline', data);
      })
  }else{
    const user = currentUser(req.cookies.login);
    User.post({author, quotes, user_id:data.user.id })
      .then(user => {
        return res.redirect('timeline');
      })
      .catch(error => {
        return res.redirect('login');
      });
  }
};

module.exports.timeline_post_delete = (req,res) => {
  const data = {
    user: currentUser(req.cookies.login),
    username: req.params.username,
    post_id: req.params.postId,
  };
  User.post_delete(data)
    .then(user => {
      if(user == 1){
        res.redirect('/timeline');
      }
    })
    .catch(error => {
      return res.redirect('login');
    });
};


module.exports.timeline_post_edit_get = (req,res) => {
  const data = {
    title:'Update Post',
    user: currentUser(req.cookies.login),
    username: req.params.username,
    post_id: req.params.postId,
  };
  User.post_edit(data)
    .then(user => {
      data.author = user.author;
      data.quotes = user.quotes;
      res.render('post_edit',data);
    })
    .catch(error => {
      return res.redirect('login');
    });
};

module.exports.timeline_post_edit_post = (req,res) => {
  const data = {
    title:'Update Post',
    user: currentUser(req.cookies.login),
    username: req.params.username,
    quotes: req.body.quotes,
    author: req.body.author,
    post_id: req.params.postId,
  };
  const { author, quotes} = req.body
  if(!author || !quotes){
    data.query = data.user;
    return res.render('post_edit',data);
  }else{
    User.post_update(data)
      .then(user => {
        return res.redirect('/timeline');
      })
      .catch(error => {
        return res.redirect('login');
      });
  }
};

///////auth///////

module.exports.register_get = (req,res) => {
  const data = {
    'title': 'Register',
    username:'',
    email:'',
  };
  res.render('register', data);
};

module.exports.register_post = (req,res) => {
  const data = {
    title: 'Register',
    user: null,
    username: req.body.username,
    email: req.body.email,
  };
  const { username, email, password, password_confirmation } = req.body
  if(!username || !email || !password || !password_confirmation || password !== password_confirmation){
    return res.render('register', data);
  }else{
    User.register({username, email, password})
      .then(user => {
        return res.redirect('timeline');
      })
      .catch(error => {
        res.status(500).render('register', data);
      });
  }
};

module.exports.login_get = (req,res) => {
  const data = {
    title: 'Login',
    email: "",
  }
  res.render('login', data);
};

module.exports.login_post = (req,res) => {
  const { email, password} = req.body
  if(!email || !password){
    const data = {
      title: 'Login',
      user: currentUser(req.cookies.login),
      email: email,
    }
    return res.render('login',data);
  }else{
    User.login({email},password)
      .then(user => {
        const token = createToken(user);
        res.cookie('login', token, { httponly:true,maxAge:maxAge * 1000});
        return res.redirect('timeline');
      })
      .catch(error => {
        return res.redirect('login');
      });
  }
};

module.exports.logout = (req,res) => {
  res.cookie('login', '', { maxAge: 1 });
  res.redirect('/');
};
