const mongoose=require('mongoose');
require('dotenv').config();

const connection=mongoose.connect(process.env.uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        

    }).then(()=>console.log("connected to database"))
    .catch((err)=>console.log("database connection error!"));

