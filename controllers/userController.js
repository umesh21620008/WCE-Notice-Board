const userModel = require("../models/userModel");
const noticeController = require("../controllers/noticeController");
const notices = require("./../models/noticeModel");
const APIFeatures = require("./../utils/APIFeatures");
const bcrypt = require("bcrypt");
const SECRET_KEY = "NOTICEAPI";
const jwt = require("jsonwebtoken");

exports.showDashboard = async (req, res) => {
  let email = req.email;
  let notice = {};
  req.admin = true;
  notice = await noticeController.getAllNotices(req, res);
  return res.render("dashboard.ejs", { notice: notice });
};

exports.getSignin = (req, res) => {

 try{
  let token = req.cookies.access_token;
  if(token){
      
      // token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.dept = user.dept;
      req.email = user.email;
     
     res.redirect("/admin-dashboard");
  }
  else{
      res.render("login.ejs");
  }
 }
 catch(error){
  res.render("login.ejs");
 }


};


exports.logout = (req,res) =>{
  return res
  .clearCookie("access_token")
  .status(200)
  .redirect("/");
}


exports.postSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email,dept: existingUser.department, id: existingUser._id },
      SECRET_KEY
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60,
      })
      .status(201)
      .redirect("/admin-dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong !!!" });
  }
};

exports.getSignup = (req, res) => {
  return req.render("login.ejs");
};

exports.postSignup = async (req, res) => {
  //Existing User Check
  //Hashed Password
  //User Creation
  //Token Generate

  const { name, email, password, department } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      department: department,
    });
    const token = jwt.sign({ email: result.email, dept: result.department, id: result._id }, SECRET_KEY);

    return res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};
