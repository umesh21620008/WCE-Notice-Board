const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");

const db = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(db).then(() => {
  console.log("Connected to DB successfully");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
