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

    let userId = User.findOne({
      where: {email: data.email},
      attributes: ['id']
    }).then(result => {

      if (result) return result.id;

      console.log("User не найден");
      const user = new User();
      user.email = data.email;
      user.isAdmin = false;

      let name = data.email.match(/[a-zA-Z0-9]+/)[0]
      user.name = user.password = name;

      return user.save().then(user => {
  //      console.log(user.dataValues);
        return user.id;
      });
    })

    let gameId = Game.findOne({
      where: {code: data.game_code},
      attributes: ['id']
    }).then(result => {
      if (!result) throw new Error("Game не найдена");
      return result.id;
    });

    Promise.all([userId, gameId]).then(result => {
      console.log(result);

      let score = new Score();
      [score.userId, score.gameId] = result;
      score.score = data.score;

      return score.save()
    }).then(score => {
      res.send(score);
    }).catch(err => {next(err)})


});

module.exports = router;
