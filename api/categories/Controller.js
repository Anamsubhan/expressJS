require('dotenv').config()
const Category = require('./model')
const {connect} = require('mongoose')


const addCat = async (req, res) => {
    const {catname, catImage} = req.body;

    if(!catname || !catImage){
        res.status(400).json({
            message : "Missing Required Field"
        })
    }

    else{
        try {
            await connect(process.env.MONGO_URL)
            const checkExistCat = await Category.exists({catname: catname})
        
            if(checkExistCat){
                res.json({
                    message: "Category Already Added"
                })
            }
            else{
                await Category.create({catname, catImage})
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

//allcategories

const getAllCategories = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const categories = await Category.find()
        res.json(
            {
                categories: categories
            }
        )}

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )}
}


//catbyname

const categorybyname = async (req, res) => {

    const { catname } = req.params


    try {
        await connect(process.env.MONGO_URL)
        const categories = await Category.findOne({catname : catname})
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

//catbyid

const categorybyid = async (req, res) => {

    const { _id } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const categories = await Category.findOne({_id : _id})
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

  //updatecategory

  const updatecategory = async (req, res) => {

    const { _id } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const categories = await Category.updateOne({_id : _id}, {
          $set:{
            catname : req.body.catname
          }
        })
        res.json(
            {
                message : "Category Updated Successfully"
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

  //deletecategory

  const deletecategory = async (req, res) => {

    const { catname } = req.params
  
  
    try {
        await connect(process.env.MONGO_URL)
        const categories = await Category.deleteOne({catname : catname})
        res.json(
            {
                message : "Category Deleted Successfully"
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




module.exports={addCat, categorybyname, categorybyid, updatecategory, deletecategory, getAllCategories}