const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const secret = require('../config/config')['secret'];
const db = require('../models/index.js')
/* GET users listing. */

console.log(db.user);

/*
const passport = require('passport');
const jwt = require('jsonwebtoken');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'jwtSecret';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
});
*/


let allUsers = "";

router.get('/', function(req, res, next) {
  res.send(allUsers);
});

router.post('/', function(req, res) {
  console.log(req.body);

  if(req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
  }
  else {
    return res.status(401).send("Введите логин и пароль");
  }


  const hash = crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');
  console.log('hash: ', hash);


  db.user.findOne({
    where: {
      email: req.body.email
    },
    attributes: [
      'id',
      'name',
      'email',
      'admin',
      'password'
    ]
  }).then(user => {
  //  allUsers = users;
//   console.log(users);

   if (!user){
     return res.status(401).send("Пользователь в базе не найден");
   }

   if (user.password != hash) {
     return res.status(401).send("Не верный пароль!");
   }




   //
  //  const payload = {id: user.id}
  //  var token = jwt.sign(payload, jwtOptions.secretOrKey);

   //
  //  if(user.admin) {
  //    return res.json({admin: true, token: token});
  //  }
  //  else {
  //    return res.json({admin: false, token: token});
  //  }

   return res.send(user.admin);



  })

});



module.exports = router;
