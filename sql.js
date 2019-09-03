const Sequelize = require("sequelize");
const crypto = require("crypto");

const sequelize = new Sequelize("ngblog", "root", "123456", {
  host: "localhost",
  dialect: "mariadb",
  port: 3308,
  dialectOptions: {
    timezone: process.env.db_timezone
  }
});

const User = sequelize.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  salt: { type: Sequelize.STRING, allowNull: false }
});

const Article = sequelize.define("article", {
  title: { type: Sequelize.STRING },
  key: { type: Sequelize.STRING },
  date: { type: Sequelize.DATE },
  content: { type: Sequelize.TEXT },
  description: { type: Sequelize.TEXT },
  imageUrl: { type: Sequelize.STRING },
  viewCount: { type: Sequelize.INTEGER },
  published: { type: Sequelize.BOOLEAN }
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
      imageUrl: "http://angular.io/assets/images/logos/angular/angular.png",
      published: true
    });

    Article.create({
      title: "The second article",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim. Vestibulum ac enim varius, euismod libero eu, elementum odio. Duis sapien leo, venenatis vitae condimentum facilisis, lobortis quis enim. Vivamus aliquam lorem sit amet tellus accumsan, eu luctus ipsum gravida. Suspendisse tellus magna, consectetur id ultricies et, rutrum rutrum lacus. Quisque vel porta nibh. Etiam vulputate magna nec vulputate pharetra. Proin facilisis aliquam sapien quis porttitor. Nam lacinia quam vitae augue rhoncus mollis. Integer viverra condimentum lorem. Integer id massa at ex pellentesque finibus.</p>",
      description: "Also a great article!",
      key: "the-second-article",
      date: new Date(),
      imageUrl:
        "http://angular.io/assets/images/logos/angular/angular_solidBlack.png",
      published: false
    });
  });

  User.sync();
};

getArticles = function(callback) {
  Article.findAll({
    order: sequelize.literal("date DESC"),
    where: { published: true }
  }).then(articles => callback(articles));
};

getArticleByKey = function(options, callback) {
  Article.findOne({ where: { key: options.key, published: true } }).then(
    article => {
      if (article != null) {
        article.update({
          viewCount: ++article.viewCount
        });
      }
      callback(article);
    }
  );
};

getDashboardArticles = function(callback) {
  Article.findAll({ order: sequelize.literal("date DESC") }).then(articles =>
    callback(articles)
  );
};

updateArticlePublishState = function(request, callback) {
  Article.findOne({ where: { id: request.id } }).then(function(article) {
    if (article != null) {
      article.update({
        published: request.published
      });
    }
    callback(article);
  });
};

getDashboardArticleByKey = function(key, callback) {
  Article.findOne({ where: { key: key } }).then(article => callback(article));
};

updateArticle = function(request, callback) {
  Article.findOne({ where: { id: request.id } }).then(function(article) {
    article.update({
      title: request.title,
      key: request.key,
      date: request.date,
      imageUrl: request.imageUrl,
      description: request.description,
      content: request.content
    });
    callback(article);
  });
};

deleteArticle = function(id, callback) {
  Article.findOne({ where: { id: id } }).then(function(article) {
    if (article != null) {
      article.destroy().then(result => callback(result));
    } else {
      callback(null);
    }
  });
};

createArticle = function(request, callback) {
  Article.create({
    title: request.title,
    key: request.key,
    date: request.date,
    imageUrl: request.imageUrl,
    description: request.description,
    content: request.content
  }).then(article => callback(article));
};

addUser = function(user, callback) {
  User.create({
    name: user.name.toLowerCase(),
    password: user.password,
    salt: user.salt
  }).then(callback(true));
};

login = function(request, callback) {
  User.findOne({
    where: {
      name: request.name
    }
  }).then(function(user) {
    if (user !== null) {
      var passwordHash = crypto
        .pbkdf2Sync(request.password, user.salt, 1000, 64, "sha512")
        .toString("hex");

      if (passwordHash === user.password) {
        callback(true);
        return;
      }
    }

    callback(false);
  });
};

module.exports.init = init;
module.exports.getArticles = getArticles;
module.exports.getArticleByKey = getArticleByKey;
module.exports.getDashboardArticles = getDashboardArticles;
module.exports.updateArticlePublishState = updateArticlePublishState;
module.exports.getDashboardArticleByKey = getDashboardArticleByKey;
module.exports.updateArticle = updateArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.createArticle = createArticle;
module.exports.addUser = addUser;
module.exports.login = login;
