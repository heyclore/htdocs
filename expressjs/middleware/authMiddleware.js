const jwt = require('jsonwebtoken');
const User = require('../models/dbHelper');

const requireAuth = (req, res, next) => {
  const token = req.cookies.login;

  if(token){
    jwt.verify(token, 'foobar', (err, decodedToken) => {
      if(err){
        res.redirect('login');
      }else{
        next();
      }
    })
  }else{
    res.redirect('login');
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.login;

  if (token) {
    jwt.verify(token, 'foobar', async (err, decodedToken) => {
      if(err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findId({id:decodedToken.id});
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

const currentUser = (req, res) => {
  if (req) {
    return jwt.verify(req, 'foobar');
  }
}

module.exports = { requireAuth , checkUser, currentUser };
