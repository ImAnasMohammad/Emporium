const {Product} = require('../models/product.js');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')


// all categories routes
router.post('/',authMiddleware,adminMiddleware,createProduct);
router.get('/search/:search/:page?/:limit?',getProductsBySearch);
router.get('/getProduct/:id',getProductById);
router.get('/label/:type/:value/:page?/:limit?/:sort?',getLabeledProducts);
router.get('/:page?/:sort?',getAllProducts);
router.delete('/:id',authMiddleware,adminMiddleware,deleteProduct);
router.put('/:id',authMiddleware,adminMiddleware,updateProduct);


function validateProductData(obj){
    const {
        name,
        description,
        image,
        images,
        brand,
        variations,
        category,
        labels
    } = obj;

    
    if(!name) return 'Invalid Name';
    if(!description) return 'Invalid Description';
    if(!brand) return 'Invalid Brand Name';
    if(!image) return 'Invalid Image';
    if(!category) return 'Invalid Category';

    if(!variations || !Array.isArray(variations)) return 'Invalid Variations';

    let msg = false;

    variations.forEach(({variation='',price,discount,quantity})=>{
        if(discount ===undefined) msg= `Invalid discount of '${variation}' variation`;
        if(quantity===undefined ) msg= `Invalid quantity of '${variation}' variation`;
        if(price === undefined) msg= `Invalid price of '${variation}' variation`;
        if(variation === '') msg= 'Invalid Variation';
    })
    return msg ; //if product is validated
}


// all route functions 


// get all product 
async function getAllProducts(req, res) {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit =  10;
        const reqSort = parseInt(req.params.sort) || 0;
        const sort = (reqSort >= 0 && reqSort <= 3) ? reqSort : 0;

        const sortList = [
            {'createdAt': 1},
            {'createdAt': -1},
            {'name': 1},
            {'name': -1},
        ];

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find()
            .populate('category')
            .select('-images')
            .sort(sortList[sort])
            .skip((page - 1) * limit)
            .limit(limit);

        if (!products) {
            return res.status(500).json({success: false, msg: 'Internal server error'});
        } else {
            return res.json({
                success: true,
                data: products,
                currentPage: page,
                totalPages: totalPages,
                totalProducts: totalProducts
            });
        }
    } catch(err) {
        console.log("error at products - get ", err);
        return res.status(500).json({success: false, msg: "Internal server error"});
    }
}

// get labeled product 
async function getLabeledProducts(req, res) {
    try {
        const type = req.params.type ?? '';
        const value = req.params.value ?? '';
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const reqSort = parseInt(req.params.sort) || 0;
        const sort = (reqSort >= 0 && reqSort <= 3) ? reqSort : 0;
        
        if (type === '' || value === '') return res.json({success: false, msg: "Invalid Details"});
        
        let query = {};

        if (type === 'label') {
            query = {labels: { $in: value }};
        } else if (type === 'category') {
            query = {category: value};
        } else {
            return res.json({success: false, msg: 'Invalid details'});
        }

        const sortList = [
            {'createdAt': 1},
            {'createdAt': -1},
            {'name': 1},
            {'name': -1}
        ];

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find(query)
            .populate('category')
            .select('-images')
            .sort(sortList[sort])
            .skip((page - 1) * limit)
            .limit(limit);

        if (!products) {
            return res.status(500).json({success: false, msg: 'Internal server error'});
        } else {
            return res.json({
                success: true,
                data: products,
                currentPage: page,
                totalPages: totalPages,
                totalProducts: totalProducts
            });
        }
    } catch(err) {
        console.log("error at products - get ", err);
        return res.status(500).json({success: false, msg: "Internal server error"});
    }
}

async function getProductsBySearch(req, res) {
    console.log("ok")
    try {
        const {search} = req.params;
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;

        if (!search) return res.json({success: false, msg: 'Search is empty'});

        const regex = new RegExp(search, 'i'); // i means case insensitive

        const query = {
            $or: [
                { name: regex },
                { description: regex }
            ]
        };

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        if (!products) {
            return res.status(500).json({success: false, msg: 'Internal server error'});
        } else {
            return res.json({
                success: true,
                data: products,
                currentPage: page,
                totalPages: totalPages,
                totalProducts: totalProducts
            });
        }
    } catch(err) {
        console.log("error at products - get ", err);
        return res.status(500).json({success: false, msg: "Internal server error"});
    }
}

//get product by id
async function getProductById(req,res){
    try{

        const {id} = req.params;
        if(!id) return res.json({success:false,msg:'Product ID is empty'});

        console.log('sfsd')

        let products = await Product.findById(id).populate('category').select('-_id');

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