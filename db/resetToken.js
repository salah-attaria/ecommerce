const mongoose=require('mongoose');
const resetTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    token: { type: String },
    expiration: { type: Date }
});
module.exports=mongoose.model('resetToken',resetTokenSchema); 