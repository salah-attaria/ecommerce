const mongoose=require('mongoose');
const order_detail_Schema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:String,
    address:String,
    address2:String,
    country:String,
    state:String,
    zip:String,
    payment:String,
    creditName:String,
    creditCardNumber:String,

})
module.exports=mongoose.model('order_details',order_detail_Schema)