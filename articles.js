const ARTICLES = require("./mock-articles");

module.exports = function(app, sql) {
  app.get("/articles", function(request, response) {
    sql.getArticles(function(result) {
      response.send(result);
    }); 
  });

  app.get("/articles/:key", function(request, response) {
    response.send(
      ARTICLES.filter(article => article.key === request.params.key)[0]
    );
  });
};
