
const mongoose = require("mongoose")
const validator = require("validator")


const {Schema} = mongoose;
const {isEmail,isAlpha} = validator;

const contactSchema = new Schema({
    fullname:{
        type:String,
        required:[true,'Fullname is required'],
        validate:[isAlpha,"Please enter valid fullname"]
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
    }
})

module.exports = mongoose.models.contact || mongoose.model('contact',contactSchema)