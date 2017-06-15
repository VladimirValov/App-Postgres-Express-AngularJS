var express = require('express');
var router = express.Router();

const db = require('../models/index.js')
/* GET users listing. */

console.log(db.user);

let allUsers = "";



router.get('/', function(req, res, next) {
  db.user.findAll().then(users => {
    allUsers = users;
    console.log(users)
  })

  res.send(allUsers);
});





module.exports = router;
