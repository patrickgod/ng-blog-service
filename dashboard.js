module.exports = function(app, sql) {
  app.get("/dashboard/overview", function(request, response) {
    sql.getDashboardArticles(result => response.send(result));
  });
};
