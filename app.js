require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

// Create an application object 
const app = express()
const port = 5000

app.get("/",(req,res)=>{
    res.sendStatus(200)
})

// Init mongodb 
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        // If db is connect run the express server 
        app.listen(port,()=>{
            console.log(`server running port:${port}`);
        })
    })
    .catch((error)=>{
        // If db isn't connect 
        console.error(error.message);
    })

