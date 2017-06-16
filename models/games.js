'use strict';
module.exports = function(sequelize, DataTypes) {
  var Games = sequelize.define('games', {
    name: DataTypes.STRING,
    code: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Games;
};
