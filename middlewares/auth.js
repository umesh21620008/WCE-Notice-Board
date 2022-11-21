const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTICEAPI";

const auth = (req, res, next) => {
  try {
    let token = req.cookies.access_token;
    if (token) {
      // token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.dept = user.dept;
      req.email = user.email;
      req.authorName = user.name;
      next();
    } else {
      res.status(401).json({ message: "Token not found " });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
