module.exports = function(app, sql) {
  app.get("/dashboard/overview", function(request, response) {
    sql.getDashboardArticles(result => response.send(result));
  });

  app.post("/dashboard/article/publish", function(request, response) {
    const id = request.body.id;
    const published = request.body.published;
    sql.updateArticlePublishState({ id: id, published: published }, function(
      article
    ) {
      response.send(article);
    });
  });

  app.get("/dashboard/article/:key", function(request, response) {
    sql.getDashboardArticleByKey(request.params.key, result =>
      response.send(result)
    );
  });
};
