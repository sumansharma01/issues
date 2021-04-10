const router=require('express').Router();
const verifyToken=require('../routes/verifyToken');
const User=require('../db/userModel');
const Issue=require('../db/issuesModel');

router.get("/individual",verifyToken,async (req,res,next)=>{
    const user=await User.findOne({_id:req.user._id});
    if(!user)
        return res.status(400).json({error:"Access denied!"});
    const issue=await Issue.findOne({email:user.email});
    if(!issue)
        return res.status(400).json({message:"No issues found with this user"})
    
    res.status(200).json(issue);
} )

router.post("/individual/",verifyToken,async(req,res,next)=>{
    const user=await User.findOne({_id:req.user._id});
    if(!user)
        return res.status(400).json({error:"Access denied!"});
    const issue=new Issue({
        email:user.email,
        name:user.name,
        title:req.body.title,
        description:req.body.description
    })
    issue.save().then(()=>res.status(200).json({message:"issue saved successfully"}))
    .catch((err)=>{res.status(500).json({message:"error while saving issue"})});
    // res.status(200).json(issue);
})

router.get("/",async(req,res,next)=>{
    const issues=await Issue.find();
    res.status(200).json({issues:issues});
})


module.exports=router;