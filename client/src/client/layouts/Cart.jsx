import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import img1 from '../assets/images/p1.webp'
import img2 from '../assets/images/p2.webp'
import img3 from '../assets/images/p.png'
import { formatCurrency } from '../common/numberFormat';
import '../assets/css/layouts/Cart.css'
import Animate from './Animate';

const Cart = ({openCart,setOpenCart,items}) => {

    const handleClose = ()=> setOpenCart(false);

    const cartItems = [
      {
        name:'shfkjdfkjsfh dsb fsfs',
        price:'2200',
        img:img1,
        variation:'M'
      },
      {
        name:'shfkjdfkjsfh dsb  sfsd s sd f fsfs',
        price:'200200',
        img:img2
      },
      {
        name:'shfkjdsfsd fsfsffkjsfh dsb fsfs',
        price:'2200',
        img:img3,
        variation:'M'
      },
      {
        name:'shfkjdfkjsfh dsb fsfs',
        price:'2200',
        img:img1,
        variation:'XXL'
      },
    ]

  return (
    <Offcanvas show={openCart} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h2>Cart</h2></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="cart-wrapper">
            <div className="cart-body">
              {
                cartItems?.map((item,index)=><CartItem item={item} key={index}/>)
              }
            </div>
            <div className="cart-fotter">
              <div className="sub-cost-wrapper">
                <span>Sub cost</span>
                <span>{formatCurrency(22000)}</span>
              </div>
              <button className="btn btn-primary">Check Out</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
  )
}

const CartItem = ({item})=>{
    return<div className="cart-item">
        <div className="cart-item-wrapper">
          <img src={item?.img} alt={item?.name} />
        </div>
        <div className="cart-item-content">
            <p>{item?.name}</p>
            {
              item?.variation && <p>{item?.variation}</p>
            }
        </div>
      </div>
}

export default Cart