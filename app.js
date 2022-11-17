const express = require("express");
const router = require("./routes/noticeRoutes");
const app = express();

app.use(express.json());
// app.use(express.static());

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));


// Set EJS as templating engine
app.set('view engine', 'ejs');

app.get("/home", (req, res) => {
  res.render("index.ejs");
});

app.get("/post-notice", (req, res) => {
  res.render("login.ejs")
});

app.get("/create-notice", (req, res) => {
  res.render("Notice.ejs")
});

app.use("/", router);

module.exports = app;
