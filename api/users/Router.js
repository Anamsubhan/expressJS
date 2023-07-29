const app = require('express')
const router =app.Router()

const {login, signup, allUsers, getUserbyEmail, getuserbyid, deleteuserbyid, updateuser} = require('./Controller')

router.post('/signup', signup )

  router.post('/login' , login)

  router.get('/getallusers', allUsers)

  router.get('/getuserbyemail/:email', getUserbyEmail)

  router.get('/getuserbyid/:_id', getuserbyid)

  router.delete('/deleteuserbyid/:_id', deleteuserbyid)

  router.put('/updateuser/:_id', updateuser)










  module.exports = router