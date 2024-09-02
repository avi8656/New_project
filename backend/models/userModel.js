const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name !"],
        maxLength:[30, "name cannot exceed 30 letters"],
        minLength:[4,"name should have more than 4 letters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your name !"],
        unique : true,
        validate : [validator.isEmail, "please enter a valid email !"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password !"],
        minLength:[6,"password should have more than 8 letters"],
        select:false
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
     },
     role:{
        type:String,
        default: "user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.set('timestamps', true);

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})


// jwt token

userSchema.methods.getJWTToken = function(){
  return jwt.sign(
    {id:this._id}, 
    process.env.JWT_SECRET, 
   {expiresIn : process.env.JWT_EXPIRE
});
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword, this.password);
}


// generate password reset token

userSchema.methods.getResetPasswordToken = async function(){
   const resetToken = crypto.randomBytes(20).toString("hex");
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   this.resetPasswordExpire = Date.now() + 15*60*1000;
   return resetToken;
}

module.exports = mongoose.model("User", userSchema);