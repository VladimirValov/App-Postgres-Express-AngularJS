'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.findByEmail = function (email) {
    return User.findOne({
      where: {email: email}
    })
  }

   User.createByEmail = function (email) {
    const user = new User();
    user.email = email;
    user.isAdmin = false;

    let name = email.match(/[a-zA-Z0-9]+/)[0]
    user.name = user.password = name;
    return user.save();
  }

  return User;
};
