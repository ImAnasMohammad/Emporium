const {Cart} = require('../models/cart.js');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const {ObjectId } = require('mongodb')

// all categories routes
router.post('/',authMiddleware,addToCart);
router.get('/',authMiddleware,getCartItems);
router.delete('/:id',authMiddleware,removeFromCart);
router.put('/:id',authMiddleware,updateCart);


function validateCartItemsData(obj){
    const {
        variation,
        product
    } = obj;

    console.log(obj.user)
    if(!variation) return 'Invalid variation';
    if(!product) return 'Invalid Product';
}


// all route functions 

// get all cart 
//get cart by id
async function getCartItems(req,res){
    try{

        const id = req.user?.userId;
        if(!id) return res.json({success:false,msg:'User ID is invalid'});
        console.log()

        let cartItems = await Cart.aggregate([
            {
                $match:{user:new ObjectId(id)},
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $project: {
                    _id:1,
                    user:1,
                    variation:1,
                    quantity:1,
                    'product._id':1,
                    'product.name':1,
                    'product.image':1,
                    'product.brand':1,
                    'product.variations':1,
                }
            }
        ]);
        
        if(!cartItems) return res.json({success:false,msg:"Items not found"});
        
        cartItems = cartItems?.map(item=>{
            const {name,image,brand,variations}= item.product[0];
            const productId= item.product[0]._id;
            const {_id,price,discount,quantity}=variations?.filter(vary=>vary.variation===item.variation)[0];

            const discountedPrice = discount>0?price*(discount/100):price;


            return {
                cartId:item._id,
                productId,
                variationId:_id,
                variation:item.variation,
                name,
                image,
                brand,
                price,
                discount,
                discountedPrice,
                quantity,
            }
        })
        return res.json({success:true,data:cartItems});
    }catch(err){
        console.log('error at Cart - get items',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create product 
async function addToCart(req,res){
    try{
        let msg = validateCartItemsData(req.body);
        if(msg) return res.json({success:false,msg});

        
        if(!req?.user?.userId) return res.json({success:false,msg:"Invalid user id"});
        
        
        let newCart = new  Cart({...req.body,user:req.user.userId});
        newCart = await newCart.save();
    
        if(!newCart) return res.json({success:false,msg:"Unable to add item to cart"});
    
        return res.json({success:true,data:newCart})
    }catch(err){
        console.log("error at Cart - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete product
async function removeFromCart(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Id'});
        let removeCartItem = await Cart.findByIdAndDelete(req.params.id);

        
        return res.json({success:true,msg:"item removed successfully.."})
    }catch(err){
        console.log("error at cart - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//update product
async function updateCart(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Id'});
        let msg = validateCartItemsData(req.body);
        
        if(msg) return res.json({success:false,msg});

        let updateCartItem = await Cart.findByIdAndUpdate(req.params.id,{...req.body})
        
        if(!updateCartItem) return res.json({success:false,msg:'Unable to change'})
    
        return res.json({success:true,msg:"updated successfully.."})
    }catch(err){
        console.log("error at cart - update ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= router