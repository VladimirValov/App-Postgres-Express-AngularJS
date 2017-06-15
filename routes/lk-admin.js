const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const secret = "qwerty1223456";

const db = require('../models/index.js')
/* GET users listing. */

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
      'admin',
      'password'
    ]
  }).then(user => {
  //  allUsers = users;
//   console.log(users);

   if (!user){
     return res.send("Пользователь в базе не найден");
   }

   if (user.password != hash) {
     return res.send("Не верный пароль!");
   }

   if(user.admin) {
     return res.send("Вы админ");
   }
   else {
     return res.send("Обычный пользователь");
   }



  })

});



module.exports = router;
