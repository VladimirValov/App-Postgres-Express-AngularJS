const express = require('express');
const router = express.Router();

const db = require('../models/index.js');
const Games = db.games;



router.get('/', function(req, res, next) {
  console.log("Games");

  db.games.findAll({
    attributes: [
      'name',
      'code'
    ]
  }).then(games => {

    if(!games) {
      return res.status(404).send("Игры не найдено");
    }

    console.log('find games: ', games.length);
    res.send(games);
  })
});



router.get('/:code', function(req, res, next) {
  const code = req.params.code;

  console.log("Games/code");
  console.log(code);

  db.games.findOne({
    where: {
      code: code
    },
    attributes: [
      'name',
      'code'
    ]
  }).then(game => {


    if(!game) {
      return res.status(404).send("Игры с таким кодом не найдено");
    }

    console.log(game.dataValues);
    res.send(game);
  })
});



module.exports = router;
