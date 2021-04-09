const express=require('express');
const app=express();


//to parse json files from postman
app.use(express.json());

//database
require('./db/conn');


//using routes
const authRoute=require('./routes/authRoute');
app.use("/user",authRoute);





module.exports=app;