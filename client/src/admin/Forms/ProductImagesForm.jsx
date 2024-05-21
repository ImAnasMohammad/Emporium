import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { toast } from 'react-toastify';

import img1 from '../../client/assets/images/p1.webp'

const ProductImagesForm = ({setProduct,setStatus,img}) => {

  const [image,setImage] = useState(img?.images);

  const handleClickNext = ()=>{

    // if(isCanMove()){
    //   toast.error("Invalid details");
    //   return;
    // }
    
    setProduct(prev=>prev={...prev,image});
    
    setStatus(prev=>prev =+ 1);
  }





  return (
    <div style={{maxWidth:'700px',margin:'0px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h4>Meta data of your product</h4>
        <button 
          className="btn btn-primary" 
        //   disabled={isCanMove()}
          onClick={handleClickNext}>Next</button>
      </div>
      <div className='images-form-wrapper'
        style={{
            marginTop:'30px',
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',
            gap:'10px'
        }}
      >
        
        {
            [1,2,3].map(item=><ImageSelector img={''}/>)
        }
      </div>
    </div>
  )
}


const ImageSelector = ({img,children})=>{
    return<div style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center'}}>
        {
            img?<img src={img} alt="Image" style={{width:'100%',aspectRatio:'4 / 5',objectFit:'contain'}}/>:
            <div>hello</div>
        }
    </div>
}

export default ProductImagesForm