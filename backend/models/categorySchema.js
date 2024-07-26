const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema ({
    nameCat: {
        type : String ,
        required : true
    } 

})


module.exports = mongoose.model("Category" , categorySchema)