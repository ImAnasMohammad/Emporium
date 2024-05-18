const { OrderItem} = require('../models/orderItems.js');
const { Order} = require('../models/order.js');
const express = require('express');
const router = express.Router();

// all order routes

// all get routes for order
router.get('/getAllOrders/:sort?',getAllOrders);

router.post('/',createOrder);
router.get('/:id',getOrdersById);
router.delete('/:id',deleteOrders);
router.put('/:id',updateOrder);
router.post('/changeStatus',changeOrderStatus);


function validateOrdersData(obj){
    const {
        userId,
        street,
        address,
        city,
        district,
        state,
        pinCode,
        totalPrice,
        orderItems
    } = obj;
    
    if(!userId) return 'Invalid User ID';
    if(!street) return 'Invalid Street';
    if(!address) return 'Invalid Address';
    if(!city) return 'Invalid City';
    if(!district) return 'Invalid District';
    if(!state) return 'Invalid State';
    if(!pinCode) return 'Invalid Pin code';
    if(!totalPrice) return 'Invalid Total Price';

    if(!orderItems || !Array.isArray(orderItems)) return 'Invalid Order Items';

    
    let msg = false;
    orderItems.forEach(item=>{
        if(!item?.product) msg = 'Invalid Product ID';
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
        const orders = await Order.find().populate('userId','name _id').sort({'dateOrder':sort});
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


        let order = await Order.findById(id);

        if(!order) return res.json({success:false,msg:"Order not found"})

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
        let msg = validateOrdersData(req.body);
        if(msg) return res.json({success:false,msg});

        let orderItemsUnResolveIds = Promise.all(req.body.orderItems.map(async (item,i)=>{
            let newOrderItem = new OrderItem({
                product:item.product,
                price:item.price,
                quantity:item.quantity,
            });
            newOrderItem= await newOrderItem.save();
            return newOrderItem?._id
        }))
        let orderItems = await orderItemsUnResolveIds;

        
        let newOrders = new  Order({...req.body,orderItems});
        newOrders = await newOrders.save();
    
        if(!newOrders) return res.json({success:false,msg:"Orders cannot be created"});
    
        return res.json({success:true,data:newOrders})
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