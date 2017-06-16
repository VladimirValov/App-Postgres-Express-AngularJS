'use strict';
module.exports = function(sequelize, DataTypes) {
  var games = sequelize.define('games', {
    name: DataTypes.STRING,
    code: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return games;
};
