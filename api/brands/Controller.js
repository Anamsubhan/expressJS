require('dotenv').config()
const Brand = require('./model')
const {connect} = require('mongoose')


const addBrand = async (req, res) => {
    const {brandname, brandImage} = req.body;

    if(!brandname || !brandImage){
        res.status(400).json({
            message : "Missing Required Field"
        })
    }

    else{
        try {
            await connect(process.env.MONGO_URL)
            const checkExistBrand = await Brand.exists({brandname: brandname})
        
            if(checkExistBrand){
                res.json({
                    message: "Brand Already Added"
                })
            }
            else{
                await Brand.create({brandname, brandImage})
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



}

//allbrands

const getAllBrands = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const brands = await Brand.find()
        res.json(
            {
                brands: brands
            }
        )}

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )}
}


//brandbyname

const brandbyname = async (req, res) => {

    const { brandname } = req.params


    try {
        await connect(process.env.MONGO_URL)
        const brands = await Brand.findOne({brandname : brandname})
        res.json(
            {
                brands: brands
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

//brandbyid

const brandbyid = async (req, res) => {

    const { _id } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const brands = await Brand.findOne({_id : _id})
        res.json(
            {
                brands: brands
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

  //updatebrand

  const updatebrand = async (req, res) => {

    const { _id } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const brands = await Brand.updateOne({_id : _id}, {
          $set:{
            brandname : req.body.brandname
          }
        })
        res.json(
            {
                message : "Brand Updated Successfully"
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

  //deletebrand

  const deletebrand = async (req, res) => {

    const { brandname } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const brands = await Brand.deleteOne({brandname : brandname})
        res.json(
            {
                message : "Brand Deleted Successfully"
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





module.exports={addBrand, brandbyname, brandbyid, updatebrand, deletebrand, getAllBrands}