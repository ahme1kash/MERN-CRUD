const express = require("express")   //import express from "express"
// on using import statements in Node Backend we need to write type:module
// in package.json just below line main:"index.js"
const mongoose = require("mongoose")  // import mongoose from "mongoose"
const bodyParser = require("body-parser") //import bodyParser from "body-Parser"
const cors = require("cors") // import cors from "cors";
const app = express();
const dotenv = require("dotenv");// import dotenv from "dotenv";
dotenv.config();
app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://mern-crud-frontend-eight.vercel.app',   // Only Allowing request from the domain of frontend deployment
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'], // Allow only these methods
    allowedHeaders: [
        "Content-Type",
        "Accept",
        "Origin",
        "X-Requested-With",
        "Content-Length"
    ],
    credentials: true
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3010;
const URL = process.env.MONGO_URL
app.use("/api", require("./routes/userRoute"));

mongoose.connect(URL).then(() => {
    console.log("DB connected successfully")
    app.listen(PORT, () => {
        console.log(`SERVER is up and running on Port - ${PORT}`)
    })
}).catch((err) => { console.log(mongoose.Error) })

