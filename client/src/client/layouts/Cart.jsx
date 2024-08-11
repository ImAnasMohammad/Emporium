import React, { useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { formatCurrency } from '../../utils/format';
import '../assets/css/layouts/Cart.css'
import Animate from './Animate';
import LazyLoadImage from '../../admin/components/LazyLoadImage';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart';

const serverURL = process.env.REACT_APP_SERVER_BASE_URL;



const Cart = ({openCart,setOpenCart}) => {

    
    const handleClose = ()=> setOpenCart(false);
    const {loading,total,cart,removeCartItem} = useCart();


    const redirect = useNavigate();

  return (
    <Offcanvas show={openCart} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h2>Cart</h2></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="cart-wrapper">
            <div className="cart-body">
              {
                cart?.map((item,index)=><Animate><CartItem item={item}  key={index} removeCartItem={removeCartItem}/></Animate>)
              }
              <div className="loading-wrapper" style={{
                  width:'100%',
                  height:'100%',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  flexDirection:'column',
                  gap:'10px'
                }}>
                  
                {
                  loading && "Loading..."
                }
                {
                  !loading && !cart?.length && "Cart is empty"
                }
                  
                </div>
            </div>
            <div className="cart-fotter">
              { cart?.length>0 &&
                <>
                  <div className="sub-cost-wrapper">
                    <span>Sub cost</span>
                    <span>{formatCurrency(total )}</span>
                  </div>
                  <button className="btn btn-primary"onClick={()=>redirect('/profile/check-out')}>Check Out</button>
                </>
              }
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
  )
}

const CartItem = ({item,removeCartItem})=>{

    const {
        cartId,
        variation,
        name,
        image,
        brand,
        price,
        discount,
        discountedPrice,
    } = item;
  
    
    return<div className="cart-item">
        <div className="cart-item-wrapper">
          <LazyLoadImage
            blurHash={image?.blurHash}
            src={`${serverURL}/upload/${image?.name}`}
          />
        </div>
        <div className="cart-item-content">
          <div>
          <p>{name}</p>
            {
              item?.variation && <p>{variation}</p>
            }
            <span style={{margin:'10px 0px'}}>{formatCurrency(discountedPrice)}</span>
          </div>
            <button
              className='btn btn-secondary remove-item-cart-btn'
              style={{display:'flex',gap:'5px',justifyContent:'center',alignItems:'center'}}
              onClick={()=>removeCartItem(cartId)}>
              <RiDeleteBin6Line/>
              Remove
            </button>
        </div>
      </div>
}

export default Cart;