
const {Router} = require("express")
const contactModel = require("../models/Contact")

const contactRoute = Router()

// Read all 
contactRoute.get('/',async(req,res)=>{
    try {
        const contacts = await contactModel.find({})
        res.status(200).json(contacts)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// Read One 
contactRoute.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const contact = await contactModel.findById(id)
        if (!contact) throw Error("Not found")
        res.status(200).json(contact)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// Read by owner 
contactRoute.get('/findbyowner/:owner',async(req,res)=>{
    try {
        const {owner} = req.params
        const contacts = await contactModel.find({owner})
        if (contacts.length == 0) throw Error("Not Found")
        res.status(200).json(contacts)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// Create one 
contactRoute.post('/',async(req,res)=>{
    try {
        const {name,email,phone_number,gender,owner } = req.body
        const contact = await contactModel.create({name,email,phone_number,gender,owner})
        res.status(200).json(contact)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// Update one 
contactRoute.put('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,email,phone_number,gender,owner } = req.body
        const obj = {}
        // Filter undefined 
        for (let[key,value] of Object.entries({name,email,phone_number,gender,owner})) if (value != undefined) obj[key] = value;
        const contact = await contactModel.findByIdAndUpdate(id,obj)
        if (!contact) throw Error("Not found")
        res.sendStatus(200)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// Delete one 
contactRoute.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const contact = await contactModel.findByIdAndDelete(id)
        if (!contact) throw Error("Not found")
        res.sendStatus(200)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})




module.exports = contactRoute;

