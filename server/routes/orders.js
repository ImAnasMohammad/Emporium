const { Product} = require('../models/product.js');
const { OrderItem} = require('../models/orderItems.js');
const { Order} = require('../models/order.js');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')

// all order routes

// all get routes for order
router.get('/getAllOrders/:page?/:limit?/:sort?',authMiddleware,adminMiddleware,getAllOrders);
router.get('/getMyOrders/:page?/:limit?/:sort?',authMiddleware,getMyOrders);

router.post('/',authMiddleware,createOrder);
router.get('/:id',authMiddleware,adminMiddleware,getOrdersById);
// router.delete('/:id',deleteOrders);
router.put('/updateStatus/:id',changeOrderStatus);
// router.post('/changeStatus',changeOrderStatus);


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
async function getMyOrders(req, res) {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const sort = req.params.sort == 1 ? 1 : -1;

        const userId = req.user.userId; // Ensure userId is defined

        const totalOrders = await Order.countDocuments({ userId });
        const totalPages = Math.ceil(totalOrders / limit);

        const orders = await Order.find({ userId })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product', // Ensure 'product' is a valid path in your OrderItem schema
                    select: 'name image' // Select the fields you need from the Product model
                }
            })
            .sort({ 'dateOrder': sort })
            .skip((page - 1) * limit)
            .limit(limit);

        if (!orders) {
            return res.status(500).json({ success: false, msg: 'Internal server error' });
        }

        const data = orders.map(order=>{
            return order?.orderItems.map(item=>({
                variation: item.variation,
                price: item?.price,
                quantity:item?.quantity,
                product: item?.product,
                id:item?._id,
                status: order?.status,
                dateOrder: order?.dateOrder,
            }))
        })
        return res.json({
            success: true,
            data:data?.flat(),
            currentPage: page,
            totalPages,
            totalOrders
        });
    } catch (err) {
        console.log("error at Orders - get my orders", err);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

async function getAllOrders (req,res){
    try{
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const sort = req.params.sort == 1 ? 1 : -1;

        const totalOrders = await Order.countDocuments();
        const cancelRequests = await Order.countDocuments({status:3});
        const totalPages = Math.ceil(totalOrders / limit);

        const orders = await Order.find(
            {},
            {
                items: { $size: '$orderItems' },
                phone: 1,
                totalPrice: 1,
                dateOrder: 1,
                status: 1,
                userId: 1
            }
        )
        .populate('userId', 'name')
        .sort({ 'dateOrder': sort })
        .skip((page - 1) * limit)
        .limit(limit);

        if (!orders) {
            return res.status(500).json({ success: false, msg: 'Internal server error' });
        }
        return res.json({
            success: true,
            data: orders,
            currentPage: page,
            totalPages,
            totalOrders,
            cancelRequests
        });
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

        const {id} = req.params;
        const {status} = req.body
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
        console.log(msg)
        if(msg) return res.json({success:false,msg});
        
        let totalPrice = 0;
        
        const orderItems = req.body.orderItems;
        
        let orderItemsSolved = await  Promise.all(orderItems.map(async (item)=>{
            const result = await Product.find({_id:item.productId,"variations._id":item.variationId},{"variations.$":1});
            if( result[0].variations[0]?.quantity<=0 ) return false;
            await Product.updateOne(
                { _id: item.productId, "variations._id": item.variationId,"variations.quantity": { $gte: 1 } },
                { $inc: { "variations.$.quantity": -1 } },
            );

            let newOrderItem = new OrderItem({
                product:item.productId,
                price:item.discountedPrice,
                quantity:1,
                variation:item.variation
            });

            totalPrice+=item.discountedPrice;
            newOrderItem= await newOrderItem.save();
            return newOrderItem?._id
          
        }))

        orderItemsSolved = orderItemsSolved?.filter(item=>item!==false);


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
        return res.json({success:true,id:newOrder._id,msg:orderItemsSolved?.length !== orderItems?.length && "Some items are ignored"})
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