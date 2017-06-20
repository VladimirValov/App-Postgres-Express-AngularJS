const express = require('express');
const router = express.Router();

const db = require('../models/index.js');

const Game = db.Game;
const User = db.User;
const Score = db.Score;


const query = {
  all: `
          SELECT "U"."name" as "user", "G"."name" as "game", "S"."score" FROM "Scores" as "S"
          LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
          LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"`
}

router.get('/', function(req, res, next) {
  const select = req.query.select ;
  console.log(select);

  const param = select || all;

  sequelize.query( query[param] ).then(scores => {
    res.send(scores[0])
  }).catch(err => {
      next(err);
  });
});


router.post('/', function(req, res, next) {
  console.log(req.body);
  const data = req.body;
  if (!data.email) throw new Error("Не передан email");
  if (!data.game_code) throw new Error("Не передано код игры");
  if (!data.score) throw new Error("Не переданы очки ");

  Promise.all([User.findByEmail(data.email), Game.findByCode(data.game_code)]).then(result => {
    [user, game] = result;

    return Promise.resolve().then(() => {
      if (!game) throw new Error("Игра не найдена");
      return user || User.createByEmail(data.email)
    }).then(user => {
        return Score.create({
          userId:user.id,
          gameId: game.id,
          score: data.score
        });
    }).then(score => {
      res.send(score);
    })
  }).catch(err => {next(err)});
});

module.exports = router;
