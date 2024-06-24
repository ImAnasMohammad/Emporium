import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/layouts/Collections.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import LazyLoadImage from '../../admin/components/LazyLoadImage';
const serverURL = process.env.REACT_APP_SERVER_BASE_URL;


const Collections = () => {
  const [category,setCategory] = useState([]); 
  useEffect(()=>{
    async function getAllCategories (){
      try{
        const res = await axios.get(`${serverURL}/categories`);
        if(res?.data?.success === true){
          setCategory(res.data.data)
        }else{
          toast.error(res?.data?.msg ?? "Something went wrong");
        }
      }catch(err){
        toast.error(err.message ?? "Something went wrong");
      }

    }

    getAllCategories()
  },[])
  return (
    <div className='collections-wrapper'>
      <h2 className=''>Our collections</h2>
      <div className="items-wrapper">
      {
        category?.map(item=><div className='collection-wrapper' key={item?._id}>
            <Link to={`/products/category/${item?._id}/${item?.name}`} className='shop-btn'>{item.name}</Link>
            <div className="image-bg"></div>
            <div className="img-wrapper">
              <LazyLoadImage
                src={`${serverURL+"/upload/"+item?.image?.name}`}
                alt={item?.name}
                blurHash={item?.image?.blurHash}
                style={{width:'100%',objectFit:'cover',aspectRatio:'1 / 1'}}
              />
            </div>
          </div>
          )
      }
      </div>
    </div>
  )
}

export default Collections