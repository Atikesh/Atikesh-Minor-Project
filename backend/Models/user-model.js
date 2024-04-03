const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require: true,
    },
    contact: {
        type:String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isBuyer: {
        type: Boolean,
        default: false,
    }
});

//hashing the password
userSchema.pre( 'save', async function () {
    console.log("pre method",this);
    const user = this;
    if(!user.isModified("password")){
        next();
    }

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password ,saltRound)
        user.password= hash_password ;
    }
    catch(err){
        console.error(err);
    }
});

//method to compare a provided password with

userSchema.methods.comparePassword = async function(password){
    try{
        return bcrypt.compare(password,this.password);
    }
    catch(err){
        console.error(err)
    }
}

//json web token
userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isBuyer: this.isBuyer,
        },
        process.env.JWT_KEY,{
            expiresIn:"30d",
        });
    }
    catch(err){
        console.log(err);
    }
}

//exports
const User = new mongoose.model("User_auth" ,userSchema,"User_auth");
module.exports = User;