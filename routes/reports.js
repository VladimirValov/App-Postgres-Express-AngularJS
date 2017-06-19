const express = require('express');
const router = express.Router();

const reportService = require('../service/reportService');


router.get('/topUser', function(req, res, next) {
  const params = req.query ;
  console.log(params);

  const gamesList = req.query.games;
  const fromDate = req.query.from;
  const toDate = req.query.to;
  const limit = req.query.limit;

  reportService.getTopUsers(gamesList, limit, fromDate, toDate).then(result =>{
    res.send(result);
  }).catch(err => {
    next(err)
  });
});


router.get('/topGame', function(req, res, next) {
  const userList = req.query.users;
  const fromDate = req.query.from;
  const toDate = req.query.to;
  const limit = req.query.limit;

  reportService.getTopGames(userList, limit, fromDate, toDate).then(result =>{
    res.send(result);
  }).catch(err => {
    next(err)
  });
});


router.post('/', function(req, res) {
  console.log(req.body);
  return res.status().send();
});

module.exports = router;
