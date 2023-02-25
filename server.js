const app = require("./app");

// following only for Localhost to use environment variables
// const dotenv = require("dotenv");
// dotenv.config({
//   path: "./config.env",
// });

const mongoose = require("mongoose");

const db = process.env.DATABASE;
mongoose.connect(db).then(() => {
  console.log("Connected to DB successfully");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
