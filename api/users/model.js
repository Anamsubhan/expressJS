const {Schema, model} =require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    }
    ,
    password : {
        type: String,
        required: true
    }
    ,
    email : {
        type: String,
        required: true,
        unique: true
    }
    ,
    profilepic : {
        type : String,
        default : "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
    }
    ,
    role: {
        type: String,
        required: true,
        default: "user"
    },
    joining : {
        type: Date,
        default : Date.now
    }
})


const User = model('user',UserSchema)
module.exports = User