import React, { useEffect, useState } from 'react'
import Slider from '../layouts/Slider';
import Collections from '../layouts/Collections';
import '../assets/css/Components/shopBtn.css'
import ProductsGroup from '../layouts/ProductsGroup';
import Layout from '../common/Layout';
import { ProductGroup1 } from '../layouts/ProductGroup1';
import SubscribeLetter from '../layouts/SubscribeLetter';
import axios from 'axios';
import { toast } from 'react-toastify';

const serverURL = process.env.REACT_APP_SERVER_BASE_URL;




const Home = () => {

  const [newArrivals,setNewArrivals] = useState([]);
  

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
  
  async function getLabeledProducts(label,setLabeledProducts){
    try{
      const res = await axios.get(`${serverURL}/products/label/label/${label}`);
      if(res?.data?.success === true ){
        setLabeledProducts(prev=>prev=res?.data?.data)
      }else{
        toast.error(res?.data?.msg ?? "Something went wrong");
      }
    }catch(err){
      toast.error(err.message ?? "Something went wrong");
    }
    
  }

  useEffect(()=>{
    getLabeledProducts('new-arrival',setNewArrivals);
  },[])
  return (
    <>
      <Layout title={"Helloo"}>
        <Slider slides={slidesData}/>
        <Collections data={group}/>
        <ProductGroup1 style={{backgroundColor:''}} heading={'new arrivals'} tag="New Arrivals" products={newArrivals}/>
        {/* <ProductsGroup style={{backgroundColor:''}} heading={'new arrivals'} tag="New Arrivals" products={newArrivals}/> */}
        <SubscribeLetter/>
      </Layout>
    </>
  )
}

export default Home