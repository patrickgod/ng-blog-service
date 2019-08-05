const Sequelize = require("sequelize");

const sequelize = new Sequelize("ngblog", "root", "123456", {
  host: "localhost",
  dialect: "mariadb",
  port: 3308,
  dialectOptions: {
    timezone: process.env.db_timezone
  }
});

const Article = sequelize.define("article", {
  title: { type: Sequelize.STRING },
  key: { type: Sequelize.STRING },
  date: { type: Sequelize.DATE },
  content: { type: Sequelize.TEXT },
  description: { type: Sequelize.TEXT },
  imageUrl: { type: Sequelize.STRING },
  viewCount: { type: Sequelize.INTEGER }
});

init = function() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database: ", err);
    });

  Article.sync({ force: true }).then(() => {
    Article.create({
      title: "My first article",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p>",
      description: "This is my first article! It's great. Please read it. :)",
      key: "my-first-article",
      date: new Date(),
      imageUrl: "http://angular.io/assets/images/logos/angular/angular.png"
    });

    Article.create({
      title: "The second article",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p>",
      description: "Also a great article!",
      key: "the-second-article",
      date: new Date(),
      imageUrl:
        "http://angular.io/assets/images/logos/angular/angular_solidBlack.png"
    });
  });
};

getArticles = function(callback) {
  Article.findAll({ order: sequelize.literal("date DESC") }).then(articles =>
    callback(articles)
  );
};

getArticleByKey = function(options, callback) {
  Article.findOne({ where: { key: options.key } }).then(article => {
    if (article != null) {
      article.update({
        viewCount: ++article.viewCount
      })
    }
    callback(article);
  });
};

getDashboardArticles = function(callback) {
  Article.findAll({ order: sequelize.literal("date DESC") }).then(articles =>
    callback(articles)
  );
};

module.exports.init = init;
module.exports.getArticles = getArticles;
module.exports.getArticleByKey = getArticleByKey;
module.exports.getDashboardArticles = getDashboardArticles;
