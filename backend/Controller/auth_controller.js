const express = require("express");
const User = require("../Models/user-model");

//Landing Page
const landingPage = async (req, res) =>{
    try{
        res.status(200).send("HELLO USER, It's our Landing Page");
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

// Registration Page
const signUp = async(req,res)=>{
    try{
        console.log(req.body);
        data = req.body;
        const {username, email,contact, password} = req.body;
        
        //Check if user already exists in DB
        const userExists = await User.findOne({email:email});

        if(userExists)
        {
            return res.status(400).json({message:"User Already Exists"})
        }

        const userCreated = await User.create({username, email, contact, password});
        console.log(userCreated);
        res.status(201).json({
            data: userCreated,
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
        next(err);
    }
}

//  Login Page
const login = async (req, res) =>{
    try{
        const{email,password}= req.body;

        const userExists = await User.findOne({email});
        console.log(userExists);
        // Checking if the user exist in DB
        if(!userExists){
            return res.status(400).json({msg : "Invalid Credentials!"});
        }  
        // 
        const user = await userExists.comparePassword(password);
        
        if(user){
            // console.log(userExists);
            // console.log(User)
            res.status(200).json({
                msg: "Login Successfull",
                token:await userExists.generateToken(),
                userId: userExists._id.toString(),
            });
        }else{
            res.status(401).json({msg : "Invalid email or password"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

// to send user logic
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData})
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}



module.exports = { landingPage ,signUp, login, user };