const express=require('express')
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const router=express.Router()
const zod=require('zod')
const { default: mongoose } = require('mongoose')

router.get('/balance',authMiddleware,async (req,res)=>{
    const userId=req.userId
    const userAccount=await Account.findOne({userId})
    return res.status(200).json({
        userId : userAccount.userId,
        balance : userAccount.balance
    })
})

const transferSchema=zod.object({
    to : zod.string(),
    amount : zod.number()
})
router.post('/transfer',authMiddleware,async (req,res)=>{
    const payload=req.body
    const validatedPayload=transferSchema.safeParse(payload)
    if(!validatedPayload){
        return res.status(400).json({
            msg : 'Transaction failed!'
        })
    }
    try{
        const session=await mongoose.startSession()
        session.startTransaction()
        const from=req.userId
        const {to,amount}=req.body
        const fromAccount=await Account.findOne({userId : from})
        if(!fromAccount || fromAccount.balance<amount){
            await session.abortTransaction()
            return res.status(400).json({
                msg : 'Insufficient Balance!'
            })
        }
        const toAccount=await Account.findOne({userId : to})
        if(!toAccount){
            await session.abortTransaction()
            return res.status(400).json({
                msg : 'Reciever account does not exists!'
            })
        }
        await Account.updateOne({userId : from},{
            $inc : {balance : -1*amount}
        }).session(session)
        await Account.updateOne({userId : to},{
            $inc : {balance : amount}
        }).session(session)
        await session.commitTransaction()
    }catch(err){
        return res.status(400).json({
            msg : 'Transaction Failed!'
        })
    }
    return res.status(200).json({
        msg : 'Transaction Successfull!'
    })
})

module.exports=router