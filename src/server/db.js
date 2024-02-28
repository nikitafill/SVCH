const { Sequelize } = require("sequelize");

module.exports = new Sequelize("TranslatorProduct", "postgres", "6592030", {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
});