const Sequelize = require("sequelize");

const sequelize = new Sequelize("ngblog", "root", "123456", {
  host: "localhost",
  dialect: "mariadb",
  port: 3308,
  dialectOptions: {
      timezone: process.env.db_timezone
  }
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
};

module.exports.init = init;