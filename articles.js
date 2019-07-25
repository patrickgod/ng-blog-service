const ARTICLES = require("./mock-articles");

module.exports = function(app, sql) {
  app.get("/articles", function(request, response) {
    sql.getArticles(function(result) {
      response.send(result);
    });
  });

  app.get("/articles/:key", function(request, response) {
    sql.getArticleByKey({ key: request.params.key }, function(article) {
      response.send(article);
    });
  });
};
