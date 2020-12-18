const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development)
const bcrypt = require('bcrypt');


module.exports.post = async (data) => {
  return db('post').insert(data);
}

module.exports.random = async (data) => {
  return db('user')
    .join('post', 'user.id', 'user_id')
    .select(
      'username as user',
      'quotes as quote',
      'author',
    ).orderBy('post.created_at', 'desc');
}

module.exports.quotes = async () => {
  return db('user')
    .join('post', 'user.id', 'user_id')
    .select(
      'username',
      'quotes',
      'author',
      'user_id',
      'post.id',
      'post.created_at',
    ).orderBy('post.created_at', 'desc');
}

module.exports.quotes_post = async (username) => {
  return db('user').where({username:username})
    .join('post', 'user.id', 'user_id')
    .select(
      'username',
      'quotes',
      'author',
      'user_id',
      'post.id',
      'post.created_at',
    ).orderBy('post.created_at', 'desc');
}



module.exports.register = async (user,res) => {
  const email = await db('user').where({email:user.email}).first();
  if(!email){
    const username = await db('user').where({username:user.username}).first();
    if(!username){
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      return db('user').insert(user);
    }else{
      throw Error('username');
    }
  }
  throw Error('email');
}

module.exports.login = async (email,password) => {
  const user = await db('user').where(email).first();
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user.id;
    }
    consoloe.log('passerr');
    throw Error('incorrect password');
  }
  consoloe.log('email err');
  throw Error('incorrect email');
}

module.exports.all = async => {
  return db('user');
}

module.exports.findId = async (id) => {
  return db('user').where(id).first();
}

module.exports.update = async (data,id) => {
  return db('user').where(id).update(data,id);//0fail//1success
}

module.exports.delete = async (id) => {
  return db('user').where({user_id:4}).del();//0fail//1success
}

