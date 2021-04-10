const mongoose=require('mongoose');

const issuesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Issue',issuesSchema);