const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    id:String,
    name: String,
    price: Number,
    description: String,
    image:String,
    
})

module.exports=new mongoose.model('products',productSchema)