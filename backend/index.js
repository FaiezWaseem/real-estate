const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const path = require('path');
const cors = require('cors')
const app = express()
const authController = require('./controllers/authController')
const propertyController  = require('./controllers/propertyController')
const uploadController = require("./controllers/uploadController")
// mongodb connect
mongoose.connect(process.env.MONGO_URL)

// app routes
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/static" , express.static(path.join(__dirname, "/public/images")));
app.use('/auth' , authController)
app.use('/property' , propertyController)
app.use("/upload" , uploadController )
app.listen(process.env.PORT, ()=> console.log(`Server Started At PORT ${process.env.PORT}`))