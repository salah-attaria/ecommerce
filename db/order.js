const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    userId: String,
    description:String,

})
module.exports =mongoose.model('carts', orderSchema)
