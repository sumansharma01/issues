const joi=require('joi');

const registerValidation=(data)=>{
    const schema=joi.object({
        name:joi.string().alphanum().min(3),
        email:joi.string().email(),
        password:joi.string().min(3)
    })
    return schema.validate(data);
}

const loginValidation=()=>{
    const schema=joi.object({
        email:joi.string.email(),
        password:joi.string().min(3)
    })
    return schema.validate({});
}


module.exports={registerValidation,loginValidation};