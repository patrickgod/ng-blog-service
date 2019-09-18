const jwtUtil = require("./jwtUtil");

module.exports = function(request, response, next) {
  const token = request.get("Authorization");
  const verified = jwtUtil.verifyJwt(token);
  if (!verified) {
    response.sendStatus(401);
    return;
  }

  next();
};
