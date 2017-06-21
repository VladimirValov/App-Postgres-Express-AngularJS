const express = require('express');
const router = express.Router();

const db = require('../models/index.js');

const Game = db.Game;


router.get('/', function(req, res, next) {
  Game.findAll({
    order: [
      ['updatedAt','DESC']
    ]}
).then(game => {
    if(!game) throw new Error("Игры не найдено");
    console.log('find Game: ', game.length);
    res.send(game);
  }).catch((err) => {
    next(err);
  })
});


router.get('/:game_id', function(req, res, next) {
  const gameId = req.params.game_id;

  Game.findById(gameId).then(game => {
    if(!game) throw new Error("Игры с таким кодом не найдено");
    res.send({
      id: game.id,
      name: game.name,
      code: game.code
    });
  }).catch((err) => {
    next(err);
  })
});


router.post('/', function(req, res, next) {
  const data = req.body;

  if (!data.code) throw new Error("Не передан код");
  if (!data.name) throw new Error("Не передано имя");

  const game = new Game();
  game.name = data.name;
  game.code = data.code;
  game.save().then((game) => {
    res.status(201).send(game);
  }).catch(err => {
    next(err);
  });
});


router.put('/:game_id', function(req, res, next) {
  const gameId = req.params.game_id;
  const data = req.body;
  console.log(data);

  Promise.resolve().then(() => {
    if (!data.code) throw new Error('Не передан code');
    if (!data.name) throw new Error('Не передано имя');
  }).then(() => {
    return Game.findById(gameId);
  }).then(game => {
    if (!game) throw new Error('Такой игры в базе нет');
    game.name = data.name;
    game.code = data.code;
    return game.save();
  }).then(game => {
    return res.send({
      id: game.id,
      name: game.name,
      code: game.code
    });
  }).catch(err => {
    next(err);
  })
});


router.delete('/:game_id', function(req, res, next) {
  const game_id = req.params.game_id;
  Game.findById(game_id).then(game => {
    if(!game) throw new Error("Игры с таким кодом не найдено");
    return game.destroy();
  }).then(() => {
    return res.status(204).send(null);
  }).catch((err) => {
    next(err);
  })
});

module.exports = router;
