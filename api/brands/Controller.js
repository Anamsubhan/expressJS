require('dotenv').config()
const Brand = require('./model')
const {connect} = require('mongoose')


const addBrand = async (req, res) => {
    const {brandname} = req.body;

try {
    await connect(process.env.MONGO_URL)
    const checkExistBrand = await Brand.exists({brandname: brandname})

    if(checkExistBrand){
        res.json({
            message: "Brand Already Added"
        })
    }
    else{
        await Brand.create({brandname})
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




module.exports={addBrand}