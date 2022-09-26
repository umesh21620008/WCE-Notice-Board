const http = require("http");
const fs = require("fs");
const express = require("express");

const app = express();

const login = fs.readFileSync(`${__dirname}/html/login.html`, "utf-8");
const login_css = fs.readFileSync(`${__dirname}/css/login.css`, "utf-8");
const home = fs.readFileSync(`${__dirname}/html/index.html`, "utf-8");
const home_css = fs.readFileSync(`${__dirname}/css/style.css`, "utf-8");
const cardTemplate = fs.readFileSync(
  `${__dirname}/html/cardTemplate.html`,
  "utf-8"
);

let i = 0;

function replaceTemplate(ele, temp) {
  temp = temp.replace(/{%CARDTITLE%}/g, ele.title);
  temp = temp.replace(/{%IMGSRC%}/g, ele.img);
  temp = temp.replace(/{%CARDSUBTITLE%}/g, ele.subtitle);
  temp = temp.replace(/{%DESCRIPTION%}/g, ele.description);
  temp = temp.replace(/{%DATE%}/g, ele.date);
  temp = temp.replace(/{%NOTICEID%}/g, ele.notice_id);
  temp = temp.replace(/{%DOWNLOAD%}/g, ele.download);
  return temp;
}

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data);

app.get("/", (req, res) => {
  let output = login.replace("/*STYLE*/", login_css);
  res.send(output);
});

app.get("/home", (req, res) => {
  let output = home.replace("/*STYLE*/", home_css);

  let cardHtml = dataObj
    .map((ele) => replaceTemplate(ele, cardTemplate))
    .join("");

  output = output.replace("{%CARDS%}", cardHtml);
  res.send(output);
});

app.post("/home", (req, res) => {
  let output = home.replace("/*STYLE*/", home_css);

  let cardHtml = dataObj
    .map((ele) => replaceTemplate(ele, cardTemplate))
    .join("");

  output = output.replace("{%CARDS%}", cardHtml);
  res.send(output);
});

app.listen("80", () => {
  console.log("Server running at 80!");
});
