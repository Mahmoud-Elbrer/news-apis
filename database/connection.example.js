const Sequelize = require("sequelize");
const initModels = require("../models/init-models.js");
const sequelize = new Sequelize("newsDB", "root", "mama1212$Hart", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: true,
    underscored: false,
  },
});
const models = initModels(sequelize);
module.exports = { models, sequelize };
