const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI)

const userSchema=new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        minLength : 3,
        maxLength : 30,
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    }
})

const User=mongoose.model('User',userSchema)


const accountSchema=mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const Account=mongoose.model('Account',accountSchema)

module.exports={
    User,
    Account
}