

const connectToMongo=require("./db");
const express = require('express')
const dotenv= require('dotenv');
dotenv.config();

var cors=require("cors");

connectToMongo();
const app = express()
const port = 5000

app.use(cors());
//this is to used request body
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})