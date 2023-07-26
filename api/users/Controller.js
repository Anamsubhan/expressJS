require('dotenv').config()
const User = require('./model')

const {connect} = require('mongoose')
const {hash, compare} =require('bcryptjs')
const { sign } = require('jsonwebtoken')


const signup = async (req, res) => {
  const {username, password, email} = req.body;

  try {

    await connect(process.env.MONGO_URL)
    // console.log("DB Connected")
    const checkExist = await User.exists({email: email})

    if (checkExist) {
      res.json({
        message: "User Already Exists"
      })
    }
    else{
      await User.create({username, email, password : await hash(password, 12)})
      res.status(201).json({
        message: "Done"
      })
    }
    
    
  } catch (error) {
    res.json({
      message: "Error"
    })
    
  }
  
}

  const login = async (req, res)=>{
    const {email, password} = req.body;

    try {
      await connect(process.env.MONGO_URL)
      const checkExistUser = await User.findOne({email: email})

      if(!checkExistUser){
        res.status(404).json({
          message: "User not find"
        })
      }
      else{

        const decryptPass = await compare(password, checkExistUser.password)
        console.log(decryptPass)
        if(email == checkExistUser.email && decryptPass){

          const token = sign(
            {
              username : checkExistUser.username,
              id : checkExistUser._id,
              email : checkExistUser.email

            }
            ,
            process.env.JWT_SECRET
          )
          res.json({
            message: "Successfully Signed In",
            token : token
          })
        }
        else{
          res.json({
          message: "Invalid user"          })
        }
        
      }

    } catch (error) {
      res.json({
        message: "Error"
      })
    }

    
  }




  module.exports = {signup, login}