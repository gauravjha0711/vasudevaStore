const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/saistore" ; 

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true , 
    },
    email : {
        type :String , 
        required : true , 
        unique : true 
    },
    phone : {
        type : Number , 
        required : true 
    },
    location : {
        type : String , 
        required : true , 
    },
    pin : {
        type : String , 
        required : true , 
    }, 
    address : {
        type : String , 
        required : true , 
    },
    houseNo : {
        type : String , 
        required : true , 
    },
    password : {
        type : String , 
        required : true , 
    }
})
const userModel = mongoose.model("userInfo",userSchema) ; 
module.exports = userModel ; 