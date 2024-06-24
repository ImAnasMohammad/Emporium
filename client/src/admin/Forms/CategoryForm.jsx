import React, { useState } from 'react'
import LazyLoadImage from '../components/LazyLoadImage';
import { isString } from 'react-bootstrap-typeahead/types/utils';
// css in client/style.css 


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const CategoryForm = ({id=null,handleSubmit,isLoading,category}) => {
    const [name,setName] = useState(category.name ?? '' );
    const [options,setOptions] = useState(category.options?.join(',') ?? '');
    const [img,setImg] = useState(category.image);

    const handleChange = (e)=>setImg({name:e.target.files[0],blurHash:''});


  return (
    <div className='category-form-wrapper'>
        <input type="text" placeholder='Enter Category name' value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="text" placeholder='Enter Options like s,m,l,xl,xxl' value={options} onChange={(e)=>setOptions(e.target.value)} />
        <div style={{backgroundColor:`rgb(218 218 218)`,display:'flex',aspectRatio:'1 / 1',justifyContent:'center',alignItems:'center',width:'200px',margin:'auto'}}>
        {
            <label className='image-upload-label'>
              <input type="file" style={{display:'none'}} onChange={handleChange}/>
              {
                img?.name === '' || img?.name === undefined  ? <span>Add Image</span>:<ShowImg img={img}/>
              }
            </label>
        }
    </div>
        <button 
          type="submit" 
          onClick={()=>handleSubmit({name,options,image:img},id)} 
          className='btn btn-primary' 
          disabled={
            (name==='' || options==='' || img?.name===''|| isLoading)
          }>
            {id ===null  ? isLoading ?"Creating...":"Create":isLoading?"Saving...":"Save"}
        </button>
    </div>
  )
}

const ShowImg = ({img})=>{
  return isString(img.name) ? 
            <LazyLoadImage
              src={`${serverURL+"/upload/"+img.name}`}
              alt="Your Image"
              blurHash={img?.blurHash}
              width={'150px'}
              style={{objectFit:'cover',aspectRatio:'1 / 1',width:'100%'}}
            />:<img src={URL.createObjectURL(img.name)} style={{objectFit:'cover',aspectRatio:'1 / 1',width:'100%'}}alt='this is from local device'/>
}

export default CategoryForm