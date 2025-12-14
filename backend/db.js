const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://VarunThisSide:Varun%4050299hii@cluster0.lnpaw.mongodb.net/paytm')

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

module.exports={
    User
}