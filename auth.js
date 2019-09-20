module.exports = function(app, sql) {
  const jwtUtil = require("./jwtUtil");
  const crypto = require("crypto");

  app.post("/user/register", function(request, response) {
    request.body.salt = crypto.randomBytes(16).toString("hex");

    var passwordHash = crypto
      .pbkdf2Sync(request.body.password, request.body.salt, 1000, 64, "sha512")
      .toString("hex");

    request.body.password = passwordHash;

    sql.addUser(request.body, function(result) {
      response.send(result);
    });
  });

  app.post("/user/login", function(request, response) {
    const name = request.body.name;
    const password = request.body.password;

    sql.login({ name, password }, result => {
      if (!result) {
        response.send(401);
      } else {
        var token = jwtUtil.signJwt(name);
        response.send({ token });
      }
    });
  });

  app.post("/user/auth", function(request, response) {
    var valid = jwtUtil.verifyJwt(request.body.token);
    response.send(valid != false);
  })
};
