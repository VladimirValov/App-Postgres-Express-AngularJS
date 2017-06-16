const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  return res.send();
});

router.post('/', function(req, res) {
  return res.status().send();
});

module.exports = router;
