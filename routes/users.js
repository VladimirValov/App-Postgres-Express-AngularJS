var express = require('express');
var router = express.Router();

const User = require('../models/users.js')
/* GET users listing. */

let allUsers = "";

User.findAll().then(users => {
  allUsers = users;
  console.log(users)
})

router.get('/', function(req, res, next) {
  res.send(allUsers);
});





module.exports = router;
