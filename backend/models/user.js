const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true,
        
    }
    , password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
//CREATEINDEXES( )USED FOR INDEXING 
//THIS IS DONE BY USING A UNIQUE FIELD IN SCHEMA FOR EXAMPLE IN ABOVE EMAIL IF NO FIELD IN UNIQUE TRUE THEN INDEXING WILL NOT TAKE PLACE
const User=mongoose.model('user',userSchema);
//User.createIndexes();
module.exports=User;