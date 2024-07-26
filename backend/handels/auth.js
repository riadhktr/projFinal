const User = require('../models/schema') ;

const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;

// register function 

exports.register =async(req,res)=>{

    let {firstName , lastName , email , password} = req.body ;
    try {
        if(!firstName || !lastName || !email || !password){
           return res.status(400).json({msg : "is required"}) 
        }
        let emailExist = await User.findOne({email});

        if(emailExist){
            return res.status(400).json({msg : "email exist"})  
        }

        let newUser = new User(req.body);
 
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        
        newUser.password = hash;
        await newUser.save();
        res.status(200).json({msg:"registred", newUser})
    } catch (error) {
        console.log(error);
       res.status(500).json({msg:"server error from register"}) 
    }
} ;

exports.login = async (req , res) =>{
    let {email , password} = req.body ;
    try {
        let chekEmail = await User.findOne({email});
        if(!chekEmail) {
            return  res.status(400).json({msg : "email not exist"}) 
        } 
        let compare = bcrypt.compareSync(password, chekEmail.password )
        if(!compare){
            return  res.status(400).json({msg : "password not exist"}) 
        }
        let payload = {
            email : email ,
            firstName : chekEmail.firstName ,
            lastName : chekEmail.lastName
        }

        let token = jwt.sign(payload , process.env.SECRET,{ expiresIn: '1h' }) ;
        res.status(200).json({msg:"loged",token,chekEmail})
    } catch (error) {
        res.status(500).json({msg:"server error from register"}) 
    }
} ;

exports.updatePassword = async(req,res)=>{
    let user = req.user ;
    
    let {password , confirmPassword} = req.body ;

    try{
        let match = bcrypt.compareSync(password , user.password) ;

        if(match){
            return res.status(400).json({msg:"you enter an old password"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({msg:"password not equal"})
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
         
        let currentUser = await User.findByIdAndUpdate({_id : user._id},{$set:{password: hashedPassword}},{new : true})

           res.status(200).json({msg:"password updated " ,currentUser})
    }catch(err){
    res.status(500).json({msg:"server error"})
    }
} ;