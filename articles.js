const ARTICLES = require("./mock-articles");

module.exports = function(app) {
  app.get("/articles", function(request, response) {
      response.send(ARTICLES);
  });
};
