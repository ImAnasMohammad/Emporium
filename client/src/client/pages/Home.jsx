import React, { useState } from 'react'
import Slider from '../layouts/Slider';
import Collections from '../layouts/Collections';
import '../assets/css/Components/shopBtn.css'
import ProductsGroup from '../layouts/ProductsGroup';
// import Cart from '../common/Cart';
import Layout from '../common/Layout';
import img1 from '../assets/images/p.png'
import img2 from '../assets/images/p1.webp'
import img3 from '../assets/images/p2.webp'
import { ProductGroup1 } from '../layouts/ProductGroup1';
import SubscribeLetter from '../layouts/SubscribeLetter';



const Home = () => {
  

  const slidesData = [
    {
      img:'https://www.seasonsemporium.com/cdn/shop/files/Holiday_Solmar_Dress_1920_x_800_f37e1501-9b63-41ce-8035-1e14be15a5b5_1944x.png?v=1692778585',
      url:'/sfsdfsdfsdf',
      heading:'Holiday',
      content:'Shop the latest range'
    },
    {
      img:'https://www.seasonsemporium.com/cdn/shop/files/Website_Banners_1_f99982b1-e68d-4ffe-9048-b3649b7fd620_1944x.png?v=1665471932',
      url:'/sfsdfsdfsdf',
      heading:'Holiday',
      content:'Shop the latest range'
    }
  ];

  const group = [
    {
      img:'https://www.seasonsemporium.com/cdn/shop/collections/Lifestyle_171x.jpg?v=1621556316',
      label:'life style',
      url:'/sdfsfsdfsdf'
    },
    {
      img:'https://www.seasonsemporium.com/cdn/shop/collections/Fashioon_180x.jpg?v=1635902635',
      label:'fashion',
      url:'/sdfsfsdfsdf'
    },
    {
      img:'https://www.seasonsemporium.com/cdn/shop/collections/Beauty_180x.jpg?v=1621554569',
      label:'Beauty',
      url:'/sdfsfsdfsdf'
    },
    {
      img:'https://www.seasonsemporium.com/cdn/shop/collections/Jewellery_180x.jpg?v=1605480800',
      label:'Jewellery',
      url:'/sdfsfsdfsdf'
    },
  ]

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
    <>
      <Layout title={"Helloo"}>
        <Slider slides={slidesData}/>
        <Collections data={group}/>
        {/* <ProductsGroup  heading={'new arrivals'} items={productGroup} className="new" label="new" /> */}
        <ProductGroup1 style={{backgroundColor:''}} heading={'new arrivals'} tag="Best sellers" products={productGroup}/>
        <SubscribeLetter/>
      </Layout>
    </>
  )
}

export default Home