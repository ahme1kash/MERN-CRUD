const express = require("express")   //import express from "express"
// on using import statements in Node Backend we need to write type:module
// in package.json just below line main:"index.js"
const mongoose = require("mongoose")  // import mongoose from "mongoose"
const bodyParser = require("body-parser") //import bodyParser from "body-Parser"
const dotenv = require("dotenv");// import dotenv from "dotenv";
const cors = require("cors") // import cors from "cors";
const app = express();
const path = require("path");
dotenv.config();
app.use(bodyParser.json());
const corsOptions = {
    origin: '*', // Allow only requests from this origin
    methods: 'GET,POST,PUT,DELETE,HEADERS', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));


app.use(express.static(path.join(__dirname, "./frontend/build")))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})
const PORT = process.env.PORT || 3010;
const URL = process.env.MONGO_URL
mongoose.connect(URL).then(() => {
    console.log("DB connected successfully")
    app.listen(PORT, () => {
        console.log(`SERVER is up and running on Port - ${PORT}`)
    })
}).catch((err) => { console.log(mongoose.Error) })
app.use("/use", (req, res) => {
    res.json({
        success: true,
        message: "Server is set up successfully"
    })
})
