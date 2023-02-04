const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require("bcrypt")

const {Schema} = mongoose;
const {isEmail,isStrongPassword} = validator;

const userScheme = new Schema({
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        validate:[isEmail,'Please enter valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        validate:[isStrongPassword,'Please enter strong password']
    }
})

userScheme.statics.login = async function(email,password){
    const user = this.findOne({email})
    if (!user) throw Error("User not found")
    if (user.password != password) throw Error("Password mismatch")
    return user
}


module.exports =  mongoose.models.user || mongoose.model('user',userScheme)