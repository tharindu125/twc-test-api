
const mongoose = require("mongoose")
const validator = require("validator")


const {Schema} = mongoose;
const {isEmail,isAlpha,isMobilePhone} = validator;

const isAlphaWithSpaces = (str) => {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(str);
  };


const contactSchema = new Schema({
    name:{
        type:String,
        required:[true,'Fullname is required'],
        validate:[isAlphaWithSpaces,"Please enter valid fullname"]
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        validate:[isEmail,'Please enter valid email']
    },
    phone_number:{
        type:String,
        required:[true,'Phone number is required'],
        validate:[isMobilePhone,'Please enter valid phone number']
    },
    gender:{
        type:String,
        required:[true,'Gender is required'],
        enum:['Male','Female']
    },
    owner:{
        type:String,
        required:[true,'Owner is required']
    }
})

module.exports = mongoose.models.contact || mongoose.model('contact',contactSchema)