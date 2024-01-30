import React from 'react';
import '../assets/css/common/ProductsGroup.css'
import { Link } from 'react-router-dom';
import img from '../assets/images/p1.webp'
import img2 from '../assets/images/p2.webp'

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
              items?.map((item,index)=><SingleProduct item={item} key={index} index={index} className={className} label={label}/>)
            }
          </div>
        </div>
      </div>
    </section>

  )
}


const SingleProduct = ({item,index,className,label}) =>{
  return<div className="col-5 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
    <Link to='/'>
      <div className="single-product">
        <div className="part-1" style={{backgroundImage:`url("${index%2 === 0 ?img:img2}")`}}>
          {className && label &&<span className={className}>{label}</span>}
          {
            console.log(className,label)
          }
        </div>
        <div className="part-2">
          <h3 className="product-title">Here Product Title</h3>
          <h4 class="product-old-price">$79.99</h4>
          <h4 className="product-price">$49.99</h4>
        </div>
      </div>
    </Link>
  </div>

}
export default ProductsGroup