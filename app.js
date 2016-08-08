
require('dotenv').config();
const PORT = process.env.PORT || 8000;

const mysql = require('mysql');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/grades', require('./routes/grades'));

// app.get('/total',(req,res)=>{
//
//
// });

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
