require('dotenv').config()
const Brand = require('../brands/model')
const Category = require('../categories/model')
const Product = require('./model')
const {connect} = require('mongoose')


const getAllProducts = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const Products = await Product.find()
        res.json(
            {
                Products: Products
            }
        )}

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )}
}

const addProduct = async (req, res) => {
    const {title,price, description, brand, category, thumb, images} = req.body;

try {
    await connect(process.env.MONGO_URL)
    const checkExistProd = await Product.exists({title: title})

    if(checkExistProd){
        res.json({
            message: "Product Already Added"
        })
    }
    else{
        await Product.create({title,price, description, brand, category, thumb, images})
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


const productbyId = async (req, res) => {

    const { _id } = req.params


    try {
        await connect(process.env.MONGO_URL)
        const Products = await Product.findOne({ _id: _id })
        res.json(
            {
                Products: Products
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

const productbyBrand = async (req, res) => {

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

const productbyCategory = async (req, res) => {

    const { catname } = req.params


    try {
        await connect(process.env.MONGO_URL)
        const categories = await Category.findOne({ catname: catname })
        res.json(
            {
                categories: categories
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

//updateproduct

const updateproduct = async (req, res) => {

    const { _id } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const Products = await Product.updateOne({_id : _id}, {
          $set:{
            title : req.body.title,
            price : req.body.price
          }
        })
        res.json(
            {
                message : "Product Updated Successfully"
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


  //deleteproduct

  const deleteproduct = async (req, res) => {

    const { title } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const Products = await Product.deleteOne({title : title})
        res.json(
            {
                message : "Product Deleted Successfully"
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

module.exports={getAllProducts, addProduct, productbyBrand, productbyCategory, productbyId, updateproduct, deleteproduct}