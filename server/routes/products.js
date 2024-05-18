const {Product} = require('../models/product.js');
const express = require('express');
const router = express.Router();

// all categories routes
router.post('/',createProduct);
router.get('/',getAllProdcuts);
router.get('/:id',getProductById);
router.delete('/:id',deleteProduct);
router.put('/:id',updateProduct);


function validateProductData(obj){
    const {
        name,
        description,
        image,
        images,
        brand,
        variatons,
        category,
        labels
    } = obj;


    // name
    // description
    // image
    // images
    // brand
    // variatons
    //     variaton
    //     price
    //     quntity
    //     discount
    // category
    // labels

    
    if(!name) return 'Invalid Name';
    if(!description) return 'Invalid Description';
    if(!brand) return 'Invalid Brand Name';
    if(!image) return 'Invalid Image';
    if(!category) return 'Invalid Category';

    if(!variatons || !Array.isArray(variatons)) return 'Invalid Variations';

    let msg = false;

    variatons.forEach(({variation='',price,discount,quntity})=>{
        if(discount ===undefined) msg= `Invalid discount of '${variation}' variation`;
        if(quntity===undefined ) msg= `Invalid quntity of '${variation}' variation`;
        if(price === undefined) msg= `Invalid price of '${variation}' variation`;
        if(variation === '') msg= 'Invalid Variation';
    })
    console.log(msg)
    return msg ; //if product is validated
}


// all route functions 


// get all product 
async function getAllProdcuts (req,res){
    try{
        const products = await Product.find();
        if(!products){
            return res.sendStatus(500).json({success:false,msg:'Internal server error'})
        }else{
            return res.json({success:true,data:products})
        }
    }catch(err){
        console.log("error at products - get ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

//get product by id
async function getProductById(req,res){
    try{

        const {id} = req.params;
        if(!id) return res.json({success:false,msg:'Product ID is empty'});


        let products = await Product.findById(id);

        if(!products) return res.json({success:false,msg:"Product not found"})

        return res.json({success:true,data:products})
    }catch(err){
        console.log('error at Product - get by id',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create product 
async function createProduct(req,res){
    try{
        let msg = validateProductData(req.body);
        if(msg) return res.json({success:false,msg});
        
        
        let newProduct = new  Product(req.body);
        newProduct = await newProduct.save();
    
        if(!newProduct) return res.json({success:false,msg:"Product cannot be created"});
    
        return res.json({success:true,data:newProduct})
    }catch(err){
        console.log("error at Product - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete product
async function deleteProduct(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Product Id'});
        let deleteProduct = await Product.findByIdAndDelete(req.params.id)
        
        if(!deleteProduct) return res.json({success:false,msg:'Product cannot be deleted'})
    
        return res.json({success:true,msg:"Product deleted successfully.."})
    }catch(err){
        console.log("error at Product - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//update product
async function updateProduct(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Product Id'});
        let msg = validateProductData(req.body);
        
        if(msg) return res.json({success:false,msg});

        let updatedProduct = await Product.findByIdAndUpdate(req.params.id,{...req.body})
        
        if(!updatedProduct) return res.json({success:false,msg:'Product cannot be updated'})
    
        return res.json({success:true,msg:"Product updated successfully.."})
    }catch(err){
        console.log("error at product - update ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= router