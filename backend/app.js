const express = require('express');
const mongoose = require('mongoose');
const bodyparse = require('body-parser');
const userroutes = require('./routes/user')
const app = express();
require('dotenv').config();
 mongoose.connect(`${process.env.MONGODB_URI}`,{ useUnifiedTopology: true ,useNewUrlParser: true})
.then(() => {
  console.log('connected');
})
.catch((err) => {
  console.log('conn failure', err);
})
app.use(bodyparse.json());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, Authorization , X-Requested-With,Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET , PUT , POST,PATCH, DELETE");
  next();
});

app.use('/api' , userroutes);

module.exports = app;
