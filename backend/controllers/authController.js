const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
authController.post('/register', async (req, res) => {
    try {
        const isExist = await User.findOne({ email: req.body.email })
        if (isExist) {
            throw new Error('Already such an Email Registered')
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({ ...req.body, password: hashPassword })
        const { password, ...others } = newUser._doc
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '72h' })
        return res.status(201).json({ others, token })
    } catch (error) {
        res.status(500).json(error.message)
    }
})
authController.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error('Wrong Credentials')
        }
        const comparePass= await bcrypt.compare(req.body.password , user.password)
        if(!comparePass){
            throw new Error('Wrong Credentials , Invalid Password') 
        }
        const { password, ...others } = user._doc

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' });
        return res.status(201).json({ others, token })

    } catch (error) {
        
        res.status(500).json(error.message)
  }
})


module.exports = authController