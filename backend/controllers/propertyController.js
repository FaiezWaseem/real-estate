const propertyController = require('express').Router()
const Property = require('../models/Property')
const verifyToken = require('../middleware/verifyToken')


// getAll
propertyController.get('/getAll' , async (req , res)=>{
    try {
        const properties = await Property.find({})
        return res.status(200).json(properties)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// get Featured
propertyController.get('/find/featured' , async (req , res)=>{
    try {
        const featuredProperties = await Property.find({ featured : true }).populate('currentOwner' , '-password')
        return res.status(200).json(featuredProperties)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// get All from specific type
// /find/?type=beach
propertyController.get('/find' , async (req , res)=>{
    try {
        const type = req.query
        const Properties = await Property.find(type).populate('currentOwner' , '-password')
        return res.status(200).json(Properties)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// get count of types => ex : (beach : 2 , village : 7)
propertyController.get('/find/types' , async (req , res)=>{
    try {
        const BeachType = await Property.countDocuments({ type : 'beach'})
        const MountainType = await Property.countDocuments({ type : 'mountain'})
        const VillageType = await Property.countDocuments({ type : 'village'})
        return res.status(200).json({
            beachs : BeachType,
            mountains:MountainType,
            villages:VillageType
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})
// get individual proptery

propertyController.get('/find/:id' , async (req , res)=>{
    try {
        const property = await Property.findById(req.params.id).populate('currentOwner' , '-passsword')
        if(!property){
            throw new Error('No Such Property with this id')
        }
        return res.status(200).json(property)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
// create a property
propertyController.post('/' , verifyToken , async( req , res)=>{
    try {
        const newProperty = await Property.create({ ...req.body , currentOwner : req.user.id})
        return res.status(201).json(newProperty)

    } catch (error) {
        res.status(500).json(error.message) 
    }
})
// update property
propertyController.put('/:id' , verifyToken , async( req , res)=>{
    try {
        const property = await Property.findById(req.params.id)
        if(property.currentOwner.toString() !== req.user.id ){
            throw new Error("Your are Not Allowed To Updated Others Property")
        }
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new :  true}
        )

        return res.status(201).json(updatedProperty)

    } catch (error) {
        res.status(500).json(error.message) 
    }
})

// delete property
propertyController.delete('/:id' , verifyToken , async( req , res)=>{
    try {
        const property = await Property.findById(req.params.id)
        if(property.currentOwner.toString() !== req.user.id ){
            throw new Error("Your are Not Allowed To Delete Others Property")
        }
        await property.deleteOne()
        return res.status(201).json({ msg : 'Successfully deleted Property'})

    } catch (error) {
        res.status(500).json(error.message) 
    }
})


module.exports = propertyController