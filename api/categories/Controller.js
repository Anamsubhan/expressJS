require('dotenv').config()
const Category = require('./model')
const {connect} = require('mongoose')


const addCat = async (req, res) => {
    const {catname} = req.body;

try {
    await connect(process.env.MONGO_URL)
    const checkExistCat = await Category.exists({catname: catname})

    if(checkExistCat){
        res.json({
            message: "Category Already Added"
        })
    }
    else{
        await Category.create({catname})
        res.status(201).json({
            message: "Done"
          })

    }   
} 
catch (error) {
    res.status(200).json({
        message: "Error"
    })
    
}

}




module.exports={addCat}