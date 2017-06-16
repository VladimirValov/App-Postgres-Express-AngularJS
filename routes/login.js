const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const passwordSecret = require('../config/config')['passwordSecret'];

const db = require('../models/index.js')
/* GET users listing. */

const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config')['jwtSecret'];

router.get('/', function(req, res, next) {
  res.send();
});

router.post('/', function(req, res) {
  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

  const hash = crypto.createHmac('sha256', passwordSecret)
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
  //  console.log(user.name);
  //  console.log(user.isAdmin);
  //  console.log(user.email);

   if (!user){
     return res.send("Пользователь в базе не найден");
   }

   if (user.password != hash) {
     return res.send("Не верный пароль!");
   }

   //Generate JWT
    let payload = {
      name: user.name,
      isAdmin: user.isAdmin
    }

    const token = jwt.sign(payload, jwtSecret);

    console.log("Выдан Токен: ", token);

    return res.send({
      name: user.name,
      isAdmin: user.isAdmin,
      token: token
    });
  })
});


module.exports = router;
