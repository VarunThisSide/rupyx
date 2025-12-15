const express=require('express')
const router=express.Router()
const zod=require('zod')
const { User } = require('../db')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET=process.env.JWT_SECRET

const signupSchema=zod.object({
    username : zod.string().min(3).max(30).trim(),
    firstName : zod.string().max(50),
    lastName : zod.string().max(50),
    password : zod.string().min(6)
})

router.post('/signup',async (req,res)=>{
    const payload=req.body
    const username=req.body.username
    const validatePayload=signupSchema.safeParse(payload)
    if(!validatePayload.success){
        return res.status(411).json({
            msg : 'Incorrect inputs',
        })
    }
    const isDuplicate=await User.findOne({username : username})
    if(isDuplicate){
        return res.status(411).json({
            msg : 'Username already taken'
        })
    }
    const newUser=User.create(payload)
    const newUserId=newUser._id
    const token=jwt.sign({newUserId},JWT_SECRET)
    return res.status(200).json({
        msg : 'User created successfully',
        token : token
    })
})

router.post('/signin',async (req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const isPresent=await User.findOne({username , password})
    if(isPresent){
        const userId=isPresent._id
        const token=jwt.sign({userId},JWT_SECRET)
        return res.status(200).json({
            token : token
        })
    }
    return res.status(411).json({
        msg : 'Error while logging in'
    })
})

module.exports=router