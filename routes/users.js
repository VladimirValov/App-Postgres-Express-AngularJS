var express = require('express');
var router = express.Router();

const db = require('../models/index.js')
const User = db.User;


router.get('/', function(req, res, next) {
  User.findAll({attributes: [
    'id',
    'name',
    'email'
  ]}).then(users => {
    console.log('find users', users.length)
    res.send(users);
  })

});





module.exports = router;
