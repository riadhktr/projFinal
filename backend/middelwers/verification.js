const jwt = require('jsonwebtoken') ;
const User = require('../models/schema')


exports.verification = async(req , res, next)=>{
    let token =req.header('Authorization')

    jwt.verify(token , process.env.SECRET , async(err,decoded)=>{
        if(!decoded){
            return res.status(400).json({msg:"not connected"})
        }else{
            let user = await User.findOne({email:decoded.email}) ;
            req.user = user ;
            next()
        }
    })
}