const express = require('express');
const router = express.Router();

const crypto = require('crypto');

const secret = require('../config/config')['secret'];

const db = require('../models/index.js')
/* GET users listing. */



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




console.log(db.user);

let allUsers = "";

router.get('/', function(req, res, next) {
  res.send(allUsers);
});

router.post('/', function(req, res) {
  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

  const hash = crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');
  console.log('hash: ', hash);


  db.user.findOne({
    where: {
      email: req.body.email
    },
    attributes: [
      'name',
      'email',
      'isAdmin',
      'password'
    ]
  }).then(user => {
  //  allUsers = users;
   console.log(user.name);
   console.log(user.isAdmin);
   console.log(user.email);

   if (!user){
     return res.send("Пользователь в базе не найден");
   }

   if (user.password != hash) {
     return res.send("Не верный пароль!");
   }

    const payload = {name: user.name}
    var token = jwt.sign(payload, jwtOptions.secretOrKey);

    return res.send({
      name: user.name,
      isAdmin: user.isAdmin,
      token: token
    });

  })

});



module.exports = router;
