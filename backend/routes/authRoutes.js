const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const zod = require("zod");

const router = express.Router();

const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post("/signup",async(req,res)=>{
    const body = req.body;
    const obj = signupSchema.safeParse(body);
    console.log(obj,body);
    if(!obj.success){
        return res.status(200).json({
            message: "Invalid inputs"
        })
    }
    const existingUser = await User.findOne({
        username : body.username
    })
    if(existingUser){
        return res.status(200).json({
            message : "Email already exists"
        })
    }
    const user = await User.create({
        username : body.username,
        password : body.password,
        firstName : body.firstName,
        lastName : body.lastName
    });
    const token = jwt.sign({
        userId : user._id},process.env.JWT_SECRET);
    res.json({
        message : "User created successfully",
        token : token
    })
})

const loginSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
   })
  
router.post("/login", async (req,res)=>{
    const body = req.body;
    console.log(body);
    const obj = loginSchema.safeParse(body)
    console.log(obj);
    if(! obj.success){
      return res.status(200).json({
        message : "Incorrect inputs"
      })
    }
    const user = await User.findOne({
      username : body.username,
      password : body.password
    });
    console.log(user)
    if(user){
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);
    res.json({
        user : user.firstName,
        token : token,
    })
}
    return res.status(200).json({
    message : "User doesn't exists"
})
})
module.exports= router;
