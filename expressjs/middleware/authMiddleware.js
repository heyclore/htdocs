const jwt = require('jsonwebtoken');
const User = require('../models/dbHelper');

const requireAuth = (req, res, next) => {
  const token = req.cookies.login;
  console.log(token);

  if(token){
    jwt.verify(token, 'foobar', (err, decodedToken) => {
      if(err){
        console.log(err.message);
        res.redirect('login');
      }else{
        console.log(decodedToken);
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
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
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
