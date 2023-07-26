const express =require('express')
const app = express()
require('dotenv').config()
const port = process.env.SERVER_PORT
const mongoose = require('mongoose')


app.use(express.json())
app.use('/api', require('./api/users/Router'))
app.use('/api', require('./api/products/Router'))
app.use('/api', require('./api/brands/Router'))
app.use('/api', require('./api/categories/Router'))




mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log("Something went wrong"))





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})