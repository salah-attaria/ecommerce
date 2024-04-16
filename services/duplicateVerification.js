const mongoose=require('mongoose')

const alredyInCart=async (req,res,next)=>{
    const existinProduct=await cart.findOne({name:req.body.name,userId:req.body.userId});
    if(existinProduct){
        cart.quantity=cart.quantity+req.body.quantity
        res.send('added to existing products')
    }else{
        cart.quantity=cart.quantity
        res.send('added successfully')

    }
    next()
}

module.exports=alredyInCart