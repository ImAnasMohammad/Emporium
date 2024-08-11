import React from 'react';
import '../assets/css/layouts/ProductsGroup.css'
import { Link } from 'react-router-dom';
import Animate from '../layouts/Animate';
import { formatCurrency } from '../../utils/format';

const ProductsGroup = ({heading,items,className,label}) => {
  return (
    <section className="section-products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h2>{heading}</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            {
              items?.map((item,index)=><SingleProduct item={item} key={index} className={className} label={label}/>)
            }
          </div>
        </div>
      </div>
    </section>

  )
}


const SingleProduct = ({item,className,label}) =>{
  return<div className="col-5 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3 single-product">
    <Animate>
      <Link to='/'>
        <div className="single-product">
          <div className="part-1" style={{backgroundImage:`url("${item?.img}")`}}>
            {className && label &&<span className={className}>{label}</span>}
          </div>
          <div className="part-2">
            <h3 className="product-title">{item?.name}</h3>
            {item?.discount && <h4 class="product-old-price">{formatCurrency(item?.price)}</h4>}
            <h4 className="product-price">{formatCurrency(item?.price-(item?.price*item?.discount)/100)}</h4>
          </div>
        </div>
      </Link>
    </Animate>
  </div>

}
export default ProductsGroup