const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetchuser=require("../middleware/fetchuser");



//ROUTE:1
//create an user using Post "/api/auth/createuser" .Doesn't require Auth
const JWT_SECRET =process.env.JWTSTRING ;

router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must have atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    //If there are errors(user input wrong email or password means that in format not supported by server)  return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() })
    }

    //Check wheather any user with this email exist already or not that we are creating now
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success,error: "Sorry this email already existed." });
        }

        //salting and encrypting the password.
        //await :-means stop here and wait for its output
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //this part is creating a new user by saving its name password and email in database
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        //this part is create token using user email id and jwtsecret string 
        //which will be used to verify this user when again he loged in with email and passowrd
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
         success=true;
        res.json({success,authtoken});
    } catch {
        console.log(error.message);
        res.status(500).send("Internal server error has occured");

    }
})


//ROUTE:2
//Authenticate a user using Post"/api/auth/login" no login required.
router.post('/login', [

    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),

], async (req, res) => {
    let success=false;
    //If there are errors(user input wrong email or password means that in format not supported by server) return bad request and errors

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { email, password } = req.body;
    try {
        //here we check is there any user exist or not with this email id
        //if not return from here
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct email and password" })
        }
        //bcz exist so compare its entered password with saved password .
        //compare function return true or false;
        //if false then also return from here no need to let him loged in
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            
            return res.status(400).json({success, error: "Please try to login with correct email and password" })
        }
        //if password matched
        //find user data
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error has occured");
    }
})



//ROUTE:3
//get loged in user details using post"/api/auth/getuser" login required

router.post('/getuser',fetchuser,async (req, res) => {
    //here we check is there any user exist or not with this email id
    //if not return from here
   
    
    try {
        //here i think userid=req.body.id not this but i lived it bcz i think there is 
        //some significant of this in front end
         userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch (error){
        console.log(error.message);
        res.status(500).send("Internal server error has occured");
    }
})
module.exports = router;