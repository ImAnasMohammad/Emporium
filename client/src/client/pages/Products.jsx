import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import { ProductGroup1 } from '../layouts/ProductGroup1'
import { FaAngleDown } from "react-icons/fa6";
import '../assets/css/pages/products.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const Products = () => {
  const [sortOpen,setSortOpen] = useState();
  const [products,setProducts] = useState([]);

  const type = useParams().type ?? 'label'
  const value = useParams().value ?? 'best-seller'
  const category = useParams().category ?? ''


  async function getLabeledProducts(){
    
    try{
      const res = await axios.get(`${serverURL}/products/label/${type}/${value}`);
      if(res?.data?.success === true ){
        setProducts(prev=>prev=res?.data?.data)
      }else{
        toast.error(res?.data?.msg ?? "Something went wrong");
      }
    }catch(err){
      toast.error(err.message ?? "Something went wrong");
    }
  }
  useEffect(()=>{
    getLabeledProducts()
  },[])
  
  const getHeading = ()=>{
    if(type === 'category') return category;

    if(type === 'label') return value;
  }
  return (
    <Layout>
      <div style={{marginTop:"50px",maxWidth:'1000px',margin:'50px auto'}}>

      <ProductGroup1 style={{backgroundColor:'',paddingTop:'0px'}} headingStyle={{textAlign:'left',fontSize:'16px'}} heading={'Home / '+getHeading()} products={products}/>
      </div>
    </Layout>
  )
}

export default Products