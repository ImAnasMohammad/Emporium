import React from 'react'
import { useAuth } from '../../../context/useAuth'
import Layout from '../../common/Layout';
import  '../../assets/css/pages/my-orders.css'
import { Link } from 'react-router-dom';
const MyOrders = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className='my-orders-main-wrapper'>
        
        <h3 style={{marginLeft:'20px'}}>My Orders</h3>
        <SingleOrder/>
        <SingleOrder/>
        <SingleOrder/>
      </div>
    </Layout>
  )
}

const SingleOrder = ()=>{
  return<Link className='order'>
      <div className='single-order-item'>
        <div className='order-item-details'>
          <div className='order-item-image'>
            <img src="https://rukminim2.flixcart.com/image/200/200/xif0q/trouser/e/s/z/30-tu1-vebnor-original-imagmy6hhhz62qzn.jpeg?q=90" alt="ssdfs" />
          </div>
          <div className='order-item-data'>
            <div className='order-item-name'>Order name of the product</div>
            <div className='order-item-variation'>variation :- s</div>
            <div className='order-item-quantity'>quantity :- 23</div>
            <div className='order-item-status'> <div></div>delivered</div>
          </div>
        </div>
      <div className='order-item-price'>2500</div>
    </div>
  </Link>
}

export default MyOrders