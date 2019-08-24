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

  app.put("/dashboard/article", function(request, response) {
    sql.updateArticle(request.body, function(result) {
      response.send(result);
    });
  });

  app.delete("/dashboard/article/:id", function(request, response) {
    sql.deleteArticle(request.params.id, result => {
      if (result != null) {
        response.send(result);
      } else {
        response.status(400).send({ message: "Article could not be deleted!" });
      }
    });
  });

  app.post("/dashboard/article", function(request, response) {
    sql.createArticle(request.body, function(result) {
      response.send(result);
    });
  });
};
