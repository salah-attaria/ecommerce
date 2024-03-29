const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const productSchema = require('./db/mongooseSchema');
const products = require('./db/mongooseSchema')
require('./db/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./db/users');
const order = require('./db/order');
const cors = require('cors');
const multer = require('multer');
const order_detail = require('./db/order_detail');
const authconfig = require('./authconfig');
const app = express();
const path = require('path');
app.use(cors({
    origin: ['http://localhost:4200'],
    optionsSuccessStatus: 200
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json());
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
});
app.get("/getData", async (req, res) => {
    // const productList = new mongoose.model("products", productSchema)
    let data = await products.find()
    // const imagePath = path.join(__dirname, 'uploads',da.image);
    // res.sendFile(imagePath);
    // console.log(imagePath)
    if (data) {
        console.log(data)
        res.send(data)
    } else {
        res.send('no data found')
    }

})
app.get("/getData/:id", async (req, res) => {
    console.log(req.params.id)
    // const productList = new mongoose.model("products", productSchema)
    let data = await products.find({ _id: req.params.id })


    res.send(data)
})
// app.post("/upload", upload, async (req, res) => {
//     let data=req.body
//     // const productList = new mongoose.model("products", productSchema)
//     // let data = await productList(req.data)
//     res.send(data)
// })
// app.post('/upload', upload.array('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     res.send('File uploaded successfully.');
// });


app.post('/register', async (req, res) => {
    let existing_user = await User.findOne({ email: req.body.email, role: req.body.role })
    if (!existing_user) {
        let userData = new User(req.body);
        // var hash = bcrypt.hashSync(req.body.password, 10)
        userData.password = bcrypt.hashSync(req.body.password, 10)
        let result = await userData.save();
        result = result.toObject();
        result.password = undefined;
        res.send(await result)
        console.log(result)
    } else {
        req.send('User already exists')
    }

})
// .select("-password")
app.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.role) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const user = await User.findOne({ email: req.body.email, role: req.body.role });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, authconfig.secret, {
            algorithm: 'HS256',
            expiresIn: '30m' // Token expires in 30 minutes
        });

        res.send({
            id: user._id,
            email: user.email,
            accessToken: token,
            role: user.role
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal server error" });
    }

})


app.post('/addOrder', async (req, res) => {
    try {
        // console.log('finding existing product:', result);

        let existingProduct = await order.findOne({ name: req.body.name, userId: req.body.userId })
        if (existingProduct) {
            const newQuantity = existingProduct.quantity + parseInt(req.body.quantity);
            console.log('Existing Product found. New Quantity: ' + newQuantity);


            let result = await order.updateOne({ name: req.body.name }, {
                $set: {
                    quantity: newQuantity,
                    description: req.body.description
                }
            });
            console.log('Updated existing product:', result);
            res.send(result);
            // console.log(result)

        } else {
            console.log('Adding new product:', req.body);
            let orderData = new order(req.body)
            // const newQuantity = parseInt(req.body.quantity);
            // console.log(newQuantity);
            orderData.quantity = parseInt(req.body.quantity)
            let result = await orderData.save();
            console.log('New product added:', result);
            res.send(result)
            // console.log(req.body)
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    }

})
app.get('/cartData/:id', async (req, res) => {
    try {
        let cartData = await order.find({ userId: req.params.id });
        res.send(cartData);
        console.log(cartData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/postBillingData', async (req, res) => {
    let existing_username = await order_detail.findOne({ username: req.body.username })
    if (existing_username) {
        let data = await order_detail.updateOne({ username: req.body.username }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                address: req.body.address,
                address2: req.body.address2,
                country: req.body.country,
                state: req.body.state,
                zip: req.body.zip,
                payment: req.body.payment,
                creditName: req.body.creditName,
                creditCardNumber: req.body.creditCardNumber,


            }
        })
        console.log('data updated');
        res.send(data);
    } else {
        console.log(req.body)
        let data = new order_detail(req.body);
        let result = await data.save();
        console.log('order details added');
        res.send(result);
    }
});
app.delete('/deleteitems/:id', async (req, res) => {
    let existing_user = await order.find({ userId: req.params.id });
    if (existing_user) {
        let cart = await order.deleteMany({ userId: req.params.id })
        console.log('cart cleared');
        res.send(cart)
    } else {
        console.log('no user exist')
    }
})
app.post('/addProduct', upload.single('image'), async (req, res) => {
    // let existing_product=await products.findOne({_id:req.body.id});
    // if(existing_product){
    //     res.send('Product alredy exists');
    // }else{

    let data = new products({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.file.originalname
    })
    console.log(data);
    if (data){
        let result = await data.save();
    res.status(201).send(result);
    }else{
        res.send('error')
    }
})
app.get('/getUsers', async (req, res) => {
    let data = await User.find().select("-password");
    console.log(data)
    if (data) {
        res.status(200).send(data
        )
    } else {
        req.send('failed to find')
    }

})
app.get('/getUserById/:id', async (req, res) => {
    let data = await User.findOne({ _id: req.params.id })
    if (data) {
        res.status(200).send(data
        )
    } else {
        req.send('failed to find')
    }

})
app.put('/updateData', async (req, res) => {
    console.log(req.body)
    let data = await User.updateOne({ _id: req.body._id }, {
        $set: req.body
    })
    if (data) {
        res.send(data)
    } else {
        req.send('failed to update')
    }

})
app.put('/updateProductData', upload.single('image'), async (req, res) => {
    console.log(req.body)
    // console.log(req.file)
    let data = await products.updateOne({ _id: req.body._id }, {
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.originalname
        }
    })
    if (data) {
        res.send(data)
    } else {
        req.send('failed to update')
    }

})
app.delete('/deleteUselessItem/:id', async (req, res) => {
    console.log(req.params.id)
    let data = await order.deleteOne({ _id: req.params.id })
    if (data) {
        res.status(200).send(data
        )
    } else {
        req.send('failed to find')
    }
})

app.delete('/deltUser/:id', async (req, res) => {
    console.log('id' + req.params.id)
    // let data=await User.findOne({_id:req.params.id});
    let result = await User.deleteOne({ _id: req.params.id })
    res.send(result)
})
app.delete('/deltProduct/:id', async (req, res) => {
    console.log('id' + req.params.id)
    // let data=await User.findOne({_id:req.params.id});
    let result = await products.deleteOne({ _id: req.params.id })
    res.send(result)
})
app.listen(4800, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server running on port 4800')
    }
})