const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development)
const bcrypt = require('bcrypt');


module.exports.post = async (data) => {
  return db('post').insert(data);
}







module.exports.register = async (user) => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  return db('user').insert(user);
}

module.exports.login = async (email,password) => {
  const user = await db('user').where(email).first();
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user.id;
    }
    throw Error('incorrect password');
  }
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

