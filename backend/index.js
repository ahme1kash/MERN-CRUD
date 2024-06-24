const express = require("express")   //import express from "express"
// on using import statements in Node Backend we need to write type:module
// in package.json just below line main:"index.js"
const mongoose = require("mongoose")  // import mongoose from "mongoose"
const bodyParser = require("body-parser") //import bodyParser from "body-Parser"
const dotenv = require("dotenv");// import dotenv from "dotenv";
const cors = require("cors") // import cors from "cors";
const app = express();
dotenv.config();
const userRoutes = require("./routes/userRoute")
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3010;
const URL = process.env.MONGO_URL
mongoose.connect(URL).then(() => {
    console.log("DB connected successfully")
    app.listen(PORT, () => {
        console.log(`SERVER is up and running on Port - ${PORT}`)
    })
}).catch((err) => { console.log(mongoose.Error) })

app.use(cors({
    origin: ['https://mern-crud-app-frontend-psi.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true

}));
app.use("/use", (req, res) => {
    res.json({
        success: true,
        message: "Server is set up successfully"
    })
})
app.use("/api", userRoutes)