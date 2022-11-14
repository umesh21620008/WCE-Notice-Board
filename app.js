const express = require("express");
const router = require("./routes/noticeRoutes");
const app = express();

app.use(express.json());
// app.use(express.static());

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.get("/home", (req, res) => {
  res.sendFile(`${__dirname}/public/html/index.html`);
  //   res.send("/html/index.html");
});

app.get("/post-notice", (req, res) => {
  res.sendFile(`${__dirname}/public/html/login.html`);
});

app.get("/create-notice", (req, res) => {
  res.sendFile(`${__dirname}/public/html/Notice.html`);
});

app.use("/", router);

module.exports = app;
