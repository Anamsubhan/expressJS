require('dotenv').config()
const User = require('./model')
const {mongodb} = require('mongodb')
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

  const allUsers = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const Users = await User.find()
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

//getuserbyemail

const getUserbyEmail = async (req, res) => {

  const { email } = req.params


  try {
      await connect(process.env.MONGO_URL)
      const Users = await User.findOne({email : email})
      res.json(
          {
              Users: Users
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
}

//getuserbyid

const getuserbyid = async (req, res) => {

  const { _id } = req.params


  try {
      await connect(process.env.MONGO_URL)
      const Users = await User.findOne({_id : _id})
      res.json(
          {
              Users: Users
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
}


//deleteuserbyid

const deleteuserbyid = async (req, res) => {

  const { _id } = req.params


  try {
      await connect(process.env.MONGO_URL)
      const Users = await User.deleteOne({_id : _id})
      res.json(
          {
              message : "User Deleted Successfully"
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
}


//updateuser

const updateuser = async (req, res) => {

  const { _id } = req.params


  try {
      await connect(process.env.MONGO_URL)
      const Users = await User.updateOne({_id : _id}, {
        $set:{
          username : req.body.username,
          profilepic : req.body.profilepic
        }
      })
      res.json(
          {
              message : "User Updated Successfully"
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
}




  module.exports = {signup, login, allUsers, getUserbyEmail, getuserbyid, deleteuserbyid, updateuser}