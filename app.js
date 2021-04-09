const express=require('express');
const app=express();

//database
require('./db/conn');

module.exports=app;