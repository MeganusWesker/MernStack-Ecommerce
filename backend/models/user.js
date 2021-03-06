const mongoose = require('mongoose');
const  validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name'],
        maxlength:[30, 'your name should be in b/w 30 characters']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        validate: [validator.isEmail,'please enter valid email address']
    },

    password:{
        type:String,
        required:[true,'please enter your passowrd'],
        minlength:[6,'your password must be longer than 6 characeters'],
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
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExprie:Date
     
    
    
    
});

userSchema.pre('save',async function(next){
   if(!this.isModified('password')){
       next();
   }
    this.password = await bcrypt.hash(this.password,10);
});

// jwt token 

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

// password comparer
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// generating passowrd

userSchema.methods.getResetPasswordToken = function (){
    // Generating token 
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hashin and adding to USerSchema 

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExprie = Date.now() + 15 * 60 * 1000;

    return resetToken;
}




module.exports = mongoose.model('User',userSchema);