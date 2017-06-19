const express = require('express');
const router = express.Router();
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = require('../models/index.js');
const Score = db.Score;



const query = {
  all: `
          SELECT "U"."name" as "user", "G"."name" as "game", "S"."score" FROM "Scores" as "S"
          LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
          LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"`,
  topGame: `
          SELECT COUNT("G"."name") as "Played",  "G"."name" as "game" FROM "Scores" as "S"
          LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
          LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"
          GROUP BY "G"."name"
          ORDER BY COUNT("G"."name") DESC`,
  topUser: `
          SELECT COUNT("U"."name") as "Played",  "U"."name" as "user" FROM "Scores" as "S"
          LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
          LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"
          GROUP BY "U"."name"
          ORDER BY COUNT("U"."name") DESC`
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




router.get('/topUser', function(req, res, next) {
  const params = req.query ;
  console.log(params);

  const gamesList = req.query.games;
  const fromDate = req.query.from;
  const toDate = req.query.to;
  const limit = req.query.limit;



  sequelize.query( selectTopUser(gamesList, limit, fromDate, toDate) ).then(scores => {
    res.send(scores[0])
  }).catch(err => {
      next(err);
  });

});

function selectTopUser(gamesList, limit, fromDate, toDate) {

  const limitResult = (limit)? `LIMIT ${limit}`: "";

  const games = (gamesList)? `"G"."id" in (${gamesList})`: "";
  const from = (fromDate) ? `"S"."createdAt" > '${fromDate}'`: "";  //'2017-06-19'
  const to = (toDate) ? `"S"."createdAt" < '${toDate}'`: "";

  let where = (games) ? games: "";
  if (from) where = (where)? where +" AND " + from : from;
  if (to)   where = (where) ? where + " AND " + to : to;
  where = (where) ? "WHERE " + where : "";

  const select = `
  SELECT COUNT("U"."name") as COUNT, "U"."name", AVG("S"."score") as avgScore
 FROM "Scores" as "S"
 LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
 LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"
 ${where}
 GROUP BY "U"."name"
 ORDER BY COUNT("U"."name") DESC
 ${limitResult}`

 return select
}



router.post('/', function(req, res) {
  console.log(req.body);
  return res.status().send();
});

module.exports = router;
