const { json } = require('express');
const Category = require('../models/categorySchema')


exports.registerCat = async(req , res) =>{
    let {nameCat} = req.body ;
    

    try {
        if(!nameCat){
            return res.status(400).json({msg:"nameCat is required"})
        }
        let newCategory = new Category(req.body) ;
        await newCategory.save() ;
        res.status(200).json({msg:"success add category" , newCategory}) ; 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"server error from register category"})
    }
}

// get all cat 

exports.allCatt = async(req , res) =>{
    await Category.find({})
    .then((doc)=>{
        res.status(200).json({msg:"list of category" , doc})

    })
    .catch((err)=>{
        res.status(500).json({msg:"server error"})
    })

} ;


// delete category 

exports.deleteCat = async(req , res)=>{
    let {id} = req.params ;
    try {
        await Category.findByIdAndDelete({_id:id}) 
        res.status(200).json({msg:'categori deleted'})
        
    } catch (error) {
        res.status(500).json({msg:'server error in deleteCat'})
    }
} ;

// update category 

exports.updateCat = async(req , res) =>{
    let {id} = req.params ;
    try {
        await Category.findByIdAndUpdate({_id:id} , {$set:req.body} , {new:true})
        res.status(200).json({msg:'category updated'})
    } catch (error) {
        res.status(500).json({msg:'server error in updateCat'})
        
    }
}