const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:String

})

module.exports=mongoose.model('users',userSchema)