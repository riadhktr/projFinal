const express = require('express') ;
const path = require('path')
const connectDB = require('./config/dbconnect');
const authRouter = require('./rout/authRoute');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express() ;

require('dotenv').config();

let port = process.env.PORT ;
connectDB() ;
app.use(cors({origin:'http://localhost:3000'})) ;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()) ;
app.use('/auth',authRouter) ;

app.listen(port , (err)=>{
    if(err){
        console.error(err);
    }
    console.log(`server run in port ${7000}`);
})