import React, { useState } from 'react'
import Layout from '../common/Layout'
import img1 from '../assets/images/p.png'
import img2 from '../assets/images/p1.webp'
import img3 from '../assets/images/p2.webp'
import { ProductGroup1 } from '../layouts/ProductGroup1'
import { FaAngleDown } from "react-icons/fa6";
import '../assets/css/pages/products.css'

const Products = () => {
  const [sortOpen,setSortOpen] = useState();
  const productGroup = [
    {
      name:'Product1',
      price:2500,
      discount:0,
      img:img1
    },
    {
      name:'sdfsfsdf dsfdsfsdfds',
      price:2500,
      discount:0,
      img:img2
    },
    {
      name:'Producsfsdfsdfsfsdfsdfsdfsdft1',
      price:2500,
      discount:100,
      img:img3
    },
    {
      name:'Prodsdfsdfdfsdfsdfdfuct1',
      price:2500,
      discount:10,
      img:img1
    },
    {
      name:'Produ sdfsdf fsdfdsfsdfsdfdfdfct1',
      price:2500,
      discount:10,
      img:img2
    },
    {
      name:'Prosdfsfsd sdfdssfsf duct1',
      price:2500,
      discount:25,
      img:img3
    }
  ]
  
  return (
    <Layout>
      <div className="products-main-wrapper">
        <div className="main-filter-wrapper">
          filter
        </div>
        <div className="product-sort-wrapper">
          <div className="sort-main-wrapper">
            <div className={`sort-wrappper ${sortOpen && 'active'}`} onClick={()=>setSortOpen(pre=>!pre)}>
              <div className="sort-btn">
                <span>Sort By :</span>
                <span className='text-bold'>Hwllo</span>
                <span className='right'><FaAngleDown/></span>
              </div>
              <div className={`sort-options ${sortOpen && 'active'}`}>
                <div className="sort-option">Price - Low to High</div>
                <div className="sort-option">Price - High to Low</div>
              </div>
            </div>
          </div>
          <ProductGroup1 style={{backgroundColor:'',paddingTop:'0px'}} products={productGroup}/>
        </div>
      </div>
    </Layout>
  )
}

export default Products