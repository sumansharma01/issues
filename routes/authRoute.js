const router=require('express').Router();
const User=require('../db/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


//validation
const {registerValidation,loginValidation}=require('../validation');

router.post("/register",async (req,res,next)=>{
    
    const {error}=registerValidation(req.body);
    if(error)
        return res.status(500).json({error:error.details[0].message});
    

        const userExists=await User.findOne({email:req.body.email})
    //checking if the email exists
    if(userExists)
        return res.status(500).json({error:"user already exists, please sign in"});

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

router.post("/login",async (req,res,next)=>{
    const {error}=loginValidation(req.body);
    if(error)
        return res.status(500).json({error:error.details[0].message});

    const user=await User.findOne({email:req.body.email});
    if(!user)
        return res.status(400).json({error:"Authentication failed"});

    const passwordValidate=await bcrypt.compare(req.body.password,user.password);
    if(!passwordValidate)
        return res.status(400).json({error:"Authentication failed"});

    const token=jwt.sign({_id:user._id},process.env.JWT_KEY);
    res.header('token',token);
    res.status(200).json({message:"Login successful", token:token});
})

module.exports=router;