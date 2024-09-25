const {Category} = require('../models/category.js');
const express = require('express');
const { Product } = require('../models/product.js');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')

// all categories routes
router.get('/',getAllCategories);
router.get('/search/:search',getCategoryBySearch);
router.post('/',authMiddleware,adminMiddleware,createCategory);
router.delete('/:id',authMiddleware,adminMiddleware,deleteCategory);
router.put('/:id',authMiddleware,adminMiddleware,updateCategory);


function validateCategoryData(obj){
    const {name,image,options} = obj;
    
    if(!name) return 'Invalid Name';
    if(!image) return 'Invalid Image';

    if(!options) return 'Invalid Variations';
    
    return false ; //if category validated
}


// all route functions 


// get all categories 
async function getAllCategories (req,res){  
    try{

        const {currentPage} = req.query ?? 1;
        const limit = 10;
        let {sort} = req.query ?? 0;
        let {search} = req.query ?? '';

        sort = (sort>=0 && sort<=3 ) ? sort : 0  ;
        search = new RegExp(search, 'i');

        const sortList = [
            {'createAt':1},
            {'createAt':-1},
            {'name':1},
            {'name':-1},
        ]

        const categories = await Category.find({name:search})
            .sort(sortList[sort])
            .skip((currentPage - 1) * limit)
            .limit(parseInt(limit));
        if(!categories){
            return res.sendStatus(500).json({success:false,msg:'Internal server error'})
        }

        if(currentPage==1){
            const total = await Category.countDocuments(search);
            return res.json({success:true,data:categories,total,limit});
        }
        return res.json({success:true,data:categories})
    }catch(err){
        console.log("error at categories - get ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

//get category by id
async function getCategoryBySearch(req,res){
    try{

        const {search} = req.params;
        if(!search) return res.json({success:false,msg:'Search is empty'});

        
        let categories = await Category.find({name:regex});
        if(!categories) return res.json({success:false,msg:"Category not found"})

        return res.json({success:true,data:categories})
    }catch(err){
        console.log('error at category - get by id',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create category 
async function createCategory(req,res){
    try{
        let msg = validateCategoryData(req.body);
        if(msg) return res.json({success:false,msg});

        let {name,image,options} = req.body
        
        let newCategory = new  Category({name,image,options});
        newCategory = await newCategory.save();
    
        if(!newCategory) return res.json({success:false,msg:"Category cannot be created"});
    
        return res.json({success:true,data:newCategory})
    }catch(err){
        console.log("error at categories - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete category
async function deleteCategory(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Category Id'});
        const catId = req.params.id;

        const deleteProducts = await Product.deleteMany({category:catId});
        let deletedCategory = await Category.findByIdAndDelete(catId);


        if(!deletedCategory) return res.json({success:false,msg:'Category cannot be deleted'})
    
        return res.json({success:true,msg:"Category deleted successfully.."})
    }catch(err){
        console.log("error at categories - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//update category
async function updateCategory(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Category Id'});
        console.log(req.body)
        if(!req.body.name)return res.json({success:false,msg:'Invalid Category Name'});
        let msg = validateCategoryData(req.body);
        
        // if(msg) return res.json({success:false,msg});

        let updatedCategory = await Category.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            image:req.body.image,
            options:req.body.options
        })
        
        if(!updatedCategory) return res.json({success:false,msg:'Category cannot be updated'})
    
        return res.json({success:true,msg:"Category updated successfully.."})
    }catch(err){
        console.log("error at categories - update ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= router