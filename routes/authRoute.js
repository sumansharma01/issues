const router=require('express').Router();
const User=require('../db/userModel');
const bcrypt=require('bcrypt');


//validation
const {registerValidation,loginValidation}=require('../validation');

router.post("/register",async (req,res,next)=>{
    
    const {error}=registerValidation(req.body);
    if(error)
        return res.status(500).json({error:error.details[0].message});
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    user.save().then(()=>{
        res.status(200).json({message:"user saved successfully"});
    }).catch((err)=>res.status(500).json({error:"cannot save the user"}));

    
})

router.post("/login",(req,res,next)=>{
    res.status(200).json({message:"hello from login post"});
})

module.exports=router;