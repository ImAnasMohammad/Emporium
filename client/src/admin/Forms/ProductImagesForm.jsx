import React, { useState } from 'react'
import "react-quill/dist/quill.snow.css"
import { toast } from 'react-toastify';
import axios from 'axios'
import LazyLoadImage from '../components/LazyLoadImage';
import { isString } from 'react-bootstrap-typeahead/types/utils';
const serverURL = process.env.REACT_APP_SERVER_BASE_URL;
 
const typeImg = {name:'',blurHash:''};

const ProductImagesForm = ({setProduct,setStatus,img,isLoading,setIsLoading}) => {

  const [image,setImage] = useState(img?.image ?? typeImg);
  const [img1,setImg1] = useState(img?.images[0] ?? typeImg)
  const [img2,setImg2] = useState(img?.images[1] ?? typeImg)
  const [img3,setImg3] = useState(img?.images[2] ?? typeImg);


  
  
  const handleClickNext = async ()=>{

    var sendImages = [];

    // checking img contains file object or db string
    const checkImagesForUpdate =(img)=>{
      // console.log(img,strList)
      return img?.name instanceof File ? img = sendImages.pop():img
    }

    if(isCanMove()){
      toast.error("Need at least one image");
      return;
    }

    setIsLoading(prev=>prev=true);

    
    
    if(image.name instanceof File)sendImages.push(image.name)
    if(img1.name  instanceof File)sendImages.push(img1.name)
    if(img2.name  instanceof File)sendImages.push(img2.name)
    if(img3.name  instanceof File)sendImages.push(img3.name);

    //checking new image uploaded or not
    if(sendImages?.length<=0){
      setStatus(prev=>prev += 1);
      setIsLoading(prev=>prev=false);
      return;
    }

    //if new image is uploaded then save the images 
    const formData = new FormData();
    sendImages?.map(img=>formData.append('images',img));

    const res = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/upload`,formData,{headers:{"Content-Type": "multipart/form-data"}});

    if(res.data?.success){
      sendImages = [...res.data?.files];
      const sendImageToDB = checkImagesForUpdate(image);
      const sendImagesToDB = [
        checkImagesForUpdate(img1),
        checkImagesForUpdate(img2),
        checkImagesForUpdate(img3)
      ]
      
      setProduct(prev=>prev={...prev,image:sendImageToDB,images:[...sendImagesToDB]});
      setStatus(prev=>prev += 1);
    }else{
      toast.error(res.data?.msg ?? "Something went wrong")    
    }
    setIsLoading(prev=>prev=false);
  }

  const isCanMove = ()=> !image?.name

  return (
    <div style={{maxWidth:'700px',margin:'0px auto',paddingTop:'20px'}}>
       <div style={{display:'flex',justifyContent:'space-between'}}>
        <h4>Images of your product</h4>
        <button 
          className="btn btn-primary"
          disabled={isCanMove() || isLoading}
          onClick={handleClickNext}
          style={{display:'flex',gap:'10px',alignItems:'center'}}
        >
            <i className="bi bi-upload" ></i>
            upload
          </button>
      </div>

      {
        !isLoading && 
        <div className='images-form-wrapper'
          style={{
              marginTop:'30px',
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',
              gap:'10px'
          }}
        >
          <ImageSelector img={image} setImg={setImage} key={0} ind={0} isMain={true}/>
          <ImageSelector img={img1} setImg={setImg1}   key={1} ind={1} isMain={false}/>
          <ImageSelector img={img2} setImg={setImg2}   key={2} ind={2} isMain={false}/>
          <ImageSelector img={img3} setImg={setImg3}   key={3} ind={3} isMain={false}/>
        </div>
      } 
    </div>
  )
}


const ImageSelector = ({img,setImg,isMain})=>{
    const handleChange = (e)=>{
      const file = e.target.files[0];
      setImg({name:file,blurHash:''});
    }

    return<div style={{backgroundColor:`rgb(218 218 218)`,display:'flex',aspectRatio:'4 / 5',justifyContent:'center',alignItems:'center'}}>
        {
            <label className='image-upload-label'>
              <input type="file" style={{display:'none'}} onChange={handleChange}/>
              {
                img?.name === '' || img?.name === undefined  ? <span>Add {isMain && 'Main'} Image</span>:<ShowImg img={img}/>
              }
            </label>
        }
    </div>
}

const ShowImg = ({img})=>{
  return isString(img.name) ? 
            <LazyLoadImage
              src={`${serverURL+"/upload/"+img.name}`}
              alt="Your Image"
              blurHash={img?.blurHash}
              width={'100%'}
              style={{width:'100%',aspectRatio:'3 / 4',objectFit:'cover'}}
            />:<img src={URL.createObjectURL(img.name)} style={{objectFit:'cover'}}width="100%" height={'100%'}alt='this is from local device'/>
}
export default ProductImagesForm