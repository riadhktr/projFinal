const express = require('express');
const { register, login, updatePassword } = require('../handels/auth');
const { verification } = require('../middelwers/verification');
const { registerProd, updateProduct, deleteProduct, allProd } = require('../handels/prodManagement');
const { registerCat, allCatt, deleteCat, updateCat } = require('../handels/categoryMenagement');
const multer  = require('multer')


const authRouter = express.Router();

// config de stockage image local
const stockage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

 const upload = multer({ 
    storage:stockage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }})





// auth routes
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.put('/updatePwd', verification ,updatePassword) ;
// product routes

authRouter.post('/addprod' , verification , upload.single('picture') , registerProd) ;
authRouter.put('/updateprod/:id' , verification , updateProduct) ;
authRouter.delete('/deleteprod/:id' , verification , deleteProduct)
authRouter.get('/allProd'  , allProd)


// category routes

authRouter.post('/addcat', verification , registerCat ) ;
authRouter.get('/allCatt' , allCatt) ;
authRouter.delete('/deletCat/:id' , deleteCat);
authRouter.put('/updateCat/:id' , updateCat)



module.exports = authRouter