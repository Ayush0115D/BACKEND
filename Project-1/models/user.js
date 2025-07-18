const mongoose=require("mongoose")
//Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String
    },
}, {timestamps:true});
const  User=mongoose.model("user",userSchema); //db apne ap plural me krdeta db.collection pe users ayega
module.exports=User;