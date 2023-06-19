const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const authController = require('./controllers/authController')

// mongodb connect
mongoose.connect(process.env.MONGO_URL)

// app routes
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/auth' , authController)
app.listen(process.env.PORT, ()=> console.log(`Server Started At PORT ${process.env.PORT}`))