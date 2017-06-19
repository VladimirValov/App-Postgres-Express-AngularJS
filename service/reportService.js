var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//
// const query = {
//   all: `
//           SELECT "U"."name" as "user", "G"."name" as "game", "S"."score" FROM "Scores" as "S"
//           LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
//           LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"`,
//   topGame: `
//           SELECT COUNT("G"."name") as "Played",  "G"."name" as "game" FROM "Scores" as "S"
//           LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
//           LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"
//           GROUP BY "G"."name"
//           ORDER BY COUNT("G"."name") DESC`,
//   topUser: `
//           SELECT COUNT("U"."name") as "Played",  "U"."name" as "user" FROM "Scores" as "S"
//           LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
//           LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"
//           GROUP BY "U"."name"
//           ORDER BY COUNT("U"."name") DESC`
// }



function getTopUsers(gamesList, limit, fromDate, toDate) {
  // { games: '3,4,11',
  // from: '2017-06-10',
  // to: '2017-06-19',
  // limit: '3' }

  const limitResult = (limit)? `LIMIT ${limit}`: "";

  const games = (gamesList)? `"G"."id" in (${gamesList})`: "";
  const from = (fromDate) ? `"S"."createdAt" > '${fromDate}'`: "";  //'2017-06-19'
  const to = (toDate) ? `"S"."createdAt" < '${toDate}'`: "";

  const where = generateWhere(games, from, to);

  const select = `
  SELECT COUNT("U"."name") as COUNT, "U"."name", AVG("S"."score") as avgScore
 FROM "Scores" as "S"
 LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
 LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"
 ${where}
 GROUP BY "U"."name"
 ORDER BY COUNT("U"."name") DESC
 ${limitResult}`

return sequelize.query(select).then(scores => {
   return scores[0];
 });
}


function getTopGames(userList, limit, fromDate, toDate) {
  // { users: '1,2,3,4',
  //   from: '2017-06-10',
  //   to: '2017-06-19',
  //   limit: '3' }

  const limitResult = (limit)? `LIMIT ${limit}`: "";

  const users = (userList)? `"U"."id" in (${userList})`: "";
  const from = (fromDate) ? `"S"."createdAt" > '${fromDate}'`: "";  //'2017-06-19'
  const to = (toDate) ? `"S"."createdAt" < '${toDate}'`: "";

  const where = generateWhere(users, from, to);

  const select = `
  SELECT COUNT("G"."name") as COUNT, "G"."name", AVG("S"."score") as avgScore
 FROM "Scores" as "S"
 LEFT JOIN "Games" as "G" on "S"."gameId" = "G"."id"
 LEFT JOIN "Users" as "U" on "S"."userId" = "U"."id"
 ${where}
 GROUP BY "G"."name"
 ORDER BY COUNT("G"."name") DESC
 ${limitResult}`

 return sequelize.query(select).then(scores => {
    return scores[0];
  });
}


function generateWhere(list, from, to) {
  let where = (list) ? list: "";
  if (from) where = (where)? where +" AND " + from : from;
  if (to)   where = (where) ? where + " AND " + to : to;
  where = (where) ? "WHERE " + where : "";
  return where;
  }


  module.exports = {
    getTopGames: getTopGames,
    getTopUsers: getTopUsers
  }
