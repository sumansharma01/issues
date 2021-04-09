const jwt=require('jsonwebtoken');

const validateJsonWebToken=(req,res,next)=>{
    const token=req.header('token');
    if(!token)
        res.status(400).json({error:"Access denied"});
    
        const validated=jwt.verify(token,process.env.JWT_KEY);
        req.user=validated;
    next();
}

module.exports=validateJsonWebToken;