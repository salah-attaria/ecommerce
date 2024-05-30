const mongoose = require('mongoose');
const users = require('./users');
const vidSchema=new mongoose.Schema({
    userId:String,
    videoName:String,
    description:String
})

module.exports=mongoose.model('videos',vidSchema)