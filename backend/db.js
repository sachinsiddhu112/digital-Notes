const mongoose=require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
// const monogURI="mongodb://localhost:27017/notebook";

const Mongo_Url = process.env.MONGO_URL;
// console.log(Mongo_Url);
const connectToMongo=async ()=>{
    await mongoose.connect(Mongo_Url);
    console.log("Mongoose connected");
}
module.exports=connectToMongo;