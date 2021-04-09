const router=require('express').Router();
const verifyToken=require('../routes/verifyToken');
const User=require('../db/userModel');

router.get("/",verifyToken,async (req,res,next)=>{
    const user=await User.findOne({_id:req.user._id});
    res.status(200).json(user.email);
} )



module.exports=router;