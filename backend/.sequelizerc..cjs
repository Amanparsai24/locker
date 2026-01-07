const path = require("path");

module.exports = {
  config: path.join(__dirname, "src/config/sequelize-cli.cjs"),
  migrations: path.join(__dirname, "src/migrations"),
};
