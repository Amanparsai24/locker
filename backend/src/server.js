require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

sequelize.sync().then(() => {
  console.log("DB connected");
  app.listen(process.env.PORT, () =>
    console.log("Server running on port", process.env.PORT)
  );
});
