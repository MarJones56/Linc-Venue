const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const UserModel = require('./models/user');
const Conversation = require("./models/Conversation");
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');

require("dotenv").config();

try{
  //mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connect(process.env.MONGO_URL)
  console.log("Connected to MongoDB")
} catch (err){
  console.log(err);
}

const app = express()
app.use(express.json())
app.use(cors({
    // origin:'http://localhost:5173',
    origin:[process.env.ORIGIN],
    methods:["GET","POST", "PUT"],
    credentials:true
}))
app.use(cookieParser())

  //middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/auth', require('./routes/auth'))
app.use(require('./routes/venueOwn'))
app.use(require('./routes/filter'))


app.use('/conversation', require('./routes/conversation'))
app.use('/messages', require('./routes/messages'))
app.use('/user', require('./routes/user'))

//const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

