

const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config')['jwtSecret'];

module.exports = function(req, res, next) {

  console.log("Проверка аввторизации");

  let token = req.headers.authorization;

//  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE0OTc2MDA4NDN9.z45Co0AwBfpezsGKbwqobZQFRbCpObMp2XLt4-gZL80";

  console.log(token);

  let decoded = jwt.verify(token, jwtSecret, function(err, decoded) {

    if (err) {
  //    console.log(err);
      return res.status(401).send("authRequire: Токен не верифицирован");
    }
//    next();

    console.log('decoded token payload', decoded);
  next()
  })
}
