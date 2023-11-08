const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const UserModel = require('./models/user');
const Conversation = require("./models/Conversation");
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');

dotenv.config();

try{
  mongoose.connect('mongodb+srv://marjone:zXos4wbdyccOFdBQ@artgalleryms.nvqiqhm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp')
  console.log("Connected to MongoDB")
} catch (err){
  console.log(err);
}

const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true
}))
app.use(cookieParser())




  //middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/auth', require('./routes/auth'))
app.use('/conversation', require('./routes/conversation'))
app.use('/messages', require('./routes/messages'))
app.use('/user', require('./routes/user'))


app.listen(5000, () => {
    console.log("Backend Server Is Running Properly")
});