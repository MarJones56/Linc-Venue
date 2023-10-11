

const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel= require('./models/user')
const UserInfoModel = require("./models/userinfo")

const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true
}))
app.use(cookieParser())


//mongoose.connect('mongodb://127.0.0.1:27017/user')

// Replace with your MongoDB Atlas connection string
const dbURI = 'mongodb+srv://bbamidel:Benabbylizy1@cluster0.w84dqp5.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


app.post('/register',(req,res)=>{
    const {username, email, password, role, fname, lname} = req.body;
    
    bcrypt.hash(password,10)
    .then(hash=>{
        UserModel.create({username,email,password: hash, role})
        .then(user => res.json("Success"))
        .catch(err=> res.json(err))
    }).catch(err => res.json(err))

    UserInfoModel.create({username, fname, lname, email, role})
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token= jwt.sign({email: user.email, role: user.role},
                    "jwt-secret-key")
                    res.cookie('token',token)
                    return res.json({Status: "Success", role : user.role })
                }else{
                    return res.json("The password is incorrect")
                }
            })
        }else{
            return res.json("No record")
        }
    })
})

app.listen(3001,()=>{
    console.log("Running")
})