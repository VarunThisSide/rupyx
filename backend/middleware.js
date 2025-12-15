const jwt=require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET=process.env.JWT_SECRET

function authMiddleware(req,res,next){
    const tokenPayload=req.headers.authorization
    const token=tokenPayload.split(' ')[1]
    try{
        const decoded=jwt.verify(token,JWT_SECRET)
        if(decoded.userId){
            req.userId=decoded.userId
            next()
        }else{
            return res.status(403).json({})
        }
    }catch(err){
        return res.status(403).json({
            msg : 'Authentication failed!'
        })
    }
}

module.exports={authMiddleware}