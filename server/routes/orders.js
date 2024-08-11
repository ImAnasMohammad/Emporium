const { Product} = require('../models/product.js');
const { OrderItem} = require('../models/orderItems.js');
const { Order} = require('../models/order.js');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js')

// all order routes

// all get routes for order
router.get('/getAllOrders/:sort?',authMiddleware,getAllOrders);

router.post('/',authMiddleware,createOrder);
router.get('/:id',authMiddleware,getOrdersById);
router.delete('/:id',deleteOrders);
router.put('/:id',updateOrder);
router.post('/changeStatus',changeOrderStatus);


function validateOrdersData(obj){
    const {
        userId,
        address,
        city,
        district,
        state,
        pincode,
        totalPrice,
        orderItems,
        landMark,
        phone,
    } = obj;
    
    if(!userId) return 'Invalid User ID';
    if(!address) return 'Invalid Address';
    if(!city) return 'Invalid City';
    if(!district) return 'Invalid District';
    if(!state) return 'Invalid State';
    if(!pincode) return 'Invalid Pin code';
    if(!landMark) return 'Invalid land mark';
    if(!phone) return 'Invalid Mobile Number';

    if(!orderItems || !Array.isArray(orderItems)) return 'Invalid Order Items';

    
    let msg = false;
    orderItems.forEach(item=>{
        if(!item?.productId) msg = 'Invalid Product ID';
        if(!item?.price) msg = 'Invalid Product Price';
        if(!item?.quantity) msg = 'Invalid Product Quantity';
    })


    return msg ; //if Orders is validated
}


// all route functions 


// get all Orders 
async function getAllOrders (req,res){
    try{
        const sort = req.params.sort==1?1 : -1;
        // const orders = await Order.find({items:{$size:'$orderItems'}}).select('_id ').populate('userId','name _id').sort({'dateOrder':sort});
        const orders = await Order.find({},
            {
                items:{$size:'$orderItems'},
                phone:1,
                totalPrice:1,
                dateOrder:1,
                status:1,
                userId:1
            }).populate('userId','name').sort({'dateOrder':sort});
        if(!orders){
            return res.sendStatus(500).json({success:false,msg:'Internal server error'})
        }
        return res.json({success:true,data:orders})
    }catch(err){
        console.log("error at Orderss - get - all ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

//get Orders by id
async function getOrdersById(req,res){
    try{

        const {id} = req.params;
        if(!id) return res.json({success:false,msg:'Order ID is empty'});
        const order =await Order.findById(id)
        .populate(
            {
                path: 'orderItems',
                populate: {
                    path: 'product',
                    model: 'Product',
                    select:'name image'
                }
            },
        )
        .populate('userId','name')
        
        if(!order) return res.json({success:false,msg:"Order not found"})

            console.log(order)
        return res.json({success:true,data:order})
    }catch(err){
        console.log('error at Orders - get by id',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//change status of order
async function changeOrderStatus(req,res){
    try{

        const {status,id} = req.body
        if(!id) return res.json({success:false,msg:'Orders ID is empty'});

        if(!status) return res.json({success:false,msg:'Status cannot be empty'});


        let orders = await Order.findByIdAndUpdate(id,{status});

        if(!orders) return res.json({success:false,msg:"Order not found"});



        return res.json({success:true,data:orders})
    }catch(err){
        console.log('error at Orders - get by id',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create Orders 
async function createOrder(req,res){
    try{
        const userId = req.user.userId;
        let msg = validateOrdersData({...req.body,userId});
        if(msg) return res.json({success:false,msg});

        let totalPrice = 0;

        const orderItems = req.body.orderItems;


        let reduceItemsResolve = Promise.all(orderItems.map(async (item)=>{
            return await Product.updateOne(
                { _id: item.productId, "variations._id": item.variationId },
                { $inc: { "variations.$.quantity": -1 } },
            );
          
        }))
        await reduceItemsResolve;


        let orderItemsUnResolveIds = Promise.all(orderItems.map(async (item)=>{
            let newOrderItem = new OrderItem({
                product:item.productId,
                price:item.discountedPrice,
                quantity:item.quantity,
                variation:item.variation
            });
            totalPrice+=item.discountedPrice;
            newOrderItem= await newOrderItem.save();
            return newOrderItem?._id
        }))

        let orderItemsSolved = await orderItemsUnResolveIds;

        const {
            address,
            city,
            district,
            state,
            pincode,
            landMark,
            phone
        } = req.body;

        
        let newOrder = new  Order({
            address,
            city,
            district,
            state,
            pincode,
            landMark,
            userId,
            totalPrice,
            orderItems:[...orderItemsSolved],
            phone
        });
        newOrder = await newOrder.save();
    
        if(!newOrder) return res.json({success:false,msg:"Orders cannot be created"});
        return res.json({success:true,id:newOrder._id})
    }catch(err){
        console.log("error at Orders - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete Orders
async function deleteOrders(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Orders Id'});
        let deleteOrders = await Orders.findByIdAndDelete(req.params.id)
        
        if(!deleteOrders) return res.json({success:false,msg:'Orders cannot be deleted'})
    
        return res.json({success:true,msg:"Orders deleted successfully.."})
    }catch(err){
        console.log("error at Orders - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//update Orders
async function updateOrder(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Order Id'});
        let msg = validateOrdersData(req.body);
        
        if(msg) return res.json({success:false,msg});

        let updatedOrders = await Orders.findByIdAndUpdate(req.params.id,{...req.body})
        
        if(!updatedOrders) return res.json({success:false,msg:'Orders cannot be updated'})
    
        return res.json({success:true,msg:"Orders updated successfully.."})
    }catch(err){
        console.log("error at Orders - update ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= router