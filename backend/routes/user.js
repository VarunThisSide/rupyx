const express=require('express')
const router=express.Router()
const zod=require('zod')
const { User, Account } = require('../db')
const jwt=require('jsonwebtoken')
const { authMiddleware } = require('../middleware')
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
    const validatedPayload=signupSchema.safeParse(payload)
    if(!validatedPayload.success){
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
    const newUser=await User.create(payload)
    const userId=newUser._id
    await Account.create({
        userId : userId,
        balance : 1+Math.random()*1000
    })
    const token=jwt.sign({userId},JWT_SECRET)
    return res.status(200).json({
        msg : 'User created successfully',
        token : token
    })
})

const signinSchema=zod.object({
    username : zod.string().min(3).max(30).trim(),
    password : zod.string().min(6)
})
router.post('/signin',async (req,res)=>{
    const payload=req.body
    const validatedPayload=signinSchema.safeParse(payload)
    if(!validatedPayload.success){
        return res.status(411).json({
            msg : 'Incorrect inputs',
        })
    }
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

const updateSchema=zod.object({
    password : zod.string().min(6).optional(),
    firstName : zod.string().max(50).optional(),
    lastName : zod.string().max(50).optional()
})
router.put('/update',authMiddleware,async (req,res)=>{
    const payload=req.body
    const validatedPayload=updateSchema.safeParse(payload)
    if(!validatedPayload.success){
        return res.status(411).json({
            msg : 'Error while updating information!'
        })
    }
    await User.updateOne({_id : req.userId},{
        $set : payload
    })
    return res.status(200).json({
        msg : 'Updated successfully!'
    })
})

router.get('/bulk/',async (req,res)=>{
    const filter=req.query.filter || ''
    const filteredUsers=await User.find({
        $or : [
            {firstName : { $regex : filter}},
            {lastName : { $regex : filter}}
        ]
    })
    const users=filteredUsers.map((user)=>{
        return {
            _id : user._id,
            firstName : user.firstName,
            lastName : user.lastName
        }
    })
    return res.status(200).json({
        users
    })
})

module.exports=router