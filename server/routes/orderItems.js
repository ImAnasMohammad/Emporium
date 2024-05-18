const {OrderItems} = require('../models/orderItems.js');






function validateOrderItemData(obj){
    const {
        product,
        price,
        quantity
    } = obj;
    
    if(!product) return 'Invalid Product ID';
    if(!price) return 'Invalid Price';
    if(!quantity) return 'Invalid Quantity';
    
    let msg = false;

    return msg ; //if OrderItems is validated
}


// all route functions 


// get all OrderItems 
async function getAllOrderItems (req,res){
    try{
        const OrderItems = await OrderItem.find();
        if(!OrderItems){
            return res.sendStatus(500).json({success:false,msg:'Internal server error'})
        }else{
            return res.json({success:true,data:OrderItems})
        }
    }catch(err){
        console.log("error at OrderItems - get ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

//get OrderItems by id
async function getOrderItemById(req,res){
    try{

        const {id} = req.params;
        if(!id) return res.json({success:false,msg:'Order Item ID is empty'});


        let OrderItem = await OrderItem.findById(id);

        if(!OrderItem) return res.json({success:false,msg:"Order Item not found"})

        return res.json({success:true,data:OrderItem})
    }catch(err){
        console.log('error at OrderItems - get by id',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create OrderItems 
async function createOrderItem(req,res){
    try{
        let msg = validateOrderItemData(req.body);
        if(msg) return res.json({success:false,msg});
        
        
        let newOrderItem = new  OrderItem(req.body);
        newOrderItem = await newOrderItem.save();
    
        if(!newOrderItem) return res.json({success:false,msg:"Order Item cannot be created"});
    
        return res.json({success:true,data:newOrderItem})
    }catch(err){
        console.log("error at OrderItems - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete OrderItems
async function deleteOrderItem(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Order Item Id'});
        let deleteOrderItem = await OrderItem.findByIdAndDelete(req.params.id)
        
        if(!deleteOrderItem) return res.json({success:false,msg:'Order Item cannot be deleted'})
    
        return res.json({success:true,msg:"Order Item deleted successfully.."})
    }catch(err){
        console.log("error at OrderItems - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//update OrderItems
async function updateOrderItem(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Order Item Id'});
        let msg = validateOrderItemData(req.body);
        
        if(msg) return res.json({success:false,msg});

        let updatedOrderItem = await OrderItem.findByIdAndUpdate(req.params.id,{...req.body})
        
        if(!updatedOrderItem) return res.json({success:false,msg:'Order Item cannot be updated'})
    
        return res.json({success:true,msg:"Order Item updated successfully.."})
    }catch(err){
        console.log("error at Order Item - update ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= {
    
};