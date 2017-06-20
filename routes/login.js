const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const passwordSecret = require('../config/config')['passwordSecret'];

const db = require('../models/index.js')
const User = db.User;
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
  if (!email) throw new Error ("Не передан email");
  if (!password) throw new Error ("Не передан пароль!");

  const hashPassword = crypto.createHmac('sha256', passwordSecret).update(password).digest('hex');
  //console.log('hashPassword : ', hashPassword);
  User.findByEmail(email).then(user => {
    if (!user) throw new Error ("Пользователь в базе не найден");
    if (user.password != hashPassword) throw new Error ("Не верный пароль!");
   //Generate JWT
    let payload = {
      name: user.name,
      isAdmin: user.isAdmin
    }
    const token = jwt.sign(payload, jwtSecret);
    console.log("Выдан Токен: ", token);
    payload.token = token;

    return res.send(payload);
  })
});


module.exports = router;
