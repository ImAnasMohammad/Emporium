import React, { useState } from 'react'
import ReactQuill from 'react-quill'

import { toast } from 'react-toastify';
import "react-quill/dist/quill.snow.css"

const ProductMetadataForm = ({setStatus,setProduct,metaData}) => {

  const inputStyle = {
    flex:'1 1 auto',
    padding:'5px'
  }

  const modules = {
    toolbar: [
      [{ 'header': [1,2,3,4,5,6,false] }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
    ],
  };
  
  const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'image', 'align'
  ];


  const [newMetaData,setNewMetaData] = useState(metaData);

  const handleChange = (e)=>{
    let newObj = {}
    if(!e?.target?.name){
      newObj['description'] = e;
    }else{
      newObj[e.target.name] = e.target.value;
    }
    setNewMetaData(prev=>prev={...prev,...newObj});
  }


  const isCanMove = ()=>{
    return (
      newMetaData?.name === '' || newMetaData?.brand === '' || newMetaData?.description === '' || newMetaData?.description === '<p><br></p>'
    )
  }

  const handleClickNext = ()=>{
    if( isCanMove() ){
      toast.error("Invalid Details")
      return;
    }
    setProduct(prev=>prev={...prev,...newMetaData});
    setStatus(prev=>prev+=1);
  }

  return (
    <div style={{maxWidth:'700px',margin:'0px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h4>Meta data of your product</h4>
        <button className="btn btn-primary" disabled={isCanMove()} onClick={handleClickNext}>Next</button>
      </div>
      <div className='metadata-form-wrapper' style={{marginTop:'30px'}}>
        <div style={{display:'flex',gap:'10px'}}>
          <input style={inputStyle}type="text" name='name' value={newMetaData?.name} onChange={handleChange} className='input'  placeholder='Enter Product name' />
          <input style={inputStyle}type="text" name='brand' value={newMetaData?.brand} onChange={handleChange} className='input'  placeholder='Enter Product Brand' />
        </div>
        <div style={{height:'200px',marginTop:'20px'}}>
          <ReactQuill
            style={{height:'100%'}}
            theme='snow'
            className='editor'
            value={newMetaData?.description}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductMetadataForm