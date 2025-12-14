const jwt=require('jsonwebtoken')
const JWT_SECRET=require('./config')

function authMiddleware(req,res,next){
    const {tokenPayload}=req.headers.authorization
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
        return res.status(403).json({})
    }
}

module.exports={authMiddleware}