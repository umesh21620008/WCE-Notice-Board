const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const SECRET_KEY = "NOTICEAPI";
const jwt = require("jsonwebtoken")
exports.getSignin =  (req,res) => {


    return req.render("login.ejs")

};

exports.postSignin = async (req,res) => {

    const { email, password} = req.body;

    try{

        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message:"User Not Found"});
        }
        

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword)
        {
            return res.status(400).json({ message:"Invalid Credentials"});
        }


        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY);

        return res.status(201).json({user:existingUser, token:token});


    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong !!!"});
    }


};

exports.getSignup = (req,res) => {

        return req.render("login.ejs")
};

exports.postSignup = async (req,res) => {

    //Existing User Check
    //Hashed Password
    //User Creation
    //Token Generate

    const {name, username, email, password, department} = req.body;

    try{
        const existingUser = await userModel.findOne({ email: email});
        if(existingUser)
        {
            return res.status(400).json({message:"User Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({

            email: email,
            password:hashedPassword,
            username: username,
            department: department


        })
        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);

        return res.status(201).json({user: result, token: token});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message:"Something Went Wrong" });
    }



};
