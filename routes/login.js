var express = require('express');
var router = express.Router();

const db = require('../models/index.js')
/* GET users listing. */

console.log(db.user);

let allUsers = "";

db.user.findAll().then(users => {
  allUsers = users;
  console.log(users)
})

router.get('/', function(req, res, next) {
  res.send(allUsers);
});



module.exports = router;
