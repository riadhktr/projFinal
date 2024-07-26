const mongoose = require('mongoose') ;



// javascript function asyncrone

const connectDB = async()=>{
    await mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("db connected");
    })
    .catch((err)=>{
        console.error(err);
    })
}

module.exports = connectDB;