import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"

const ProductMetadataForm = () => {

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


  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [brand,setBrand] = useState('')

  return (
    <div style={{maxWidth:'700px',margin:'0px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h4>Meta data of your product</h4>
        <button className="btn btn-primary">Next</button>
      </div>
      <div className='metadata-form-wrapper' style={{marginTop:'30px'}}>
        <div style={{display:'flex',gap:'10px'}}>
          <input style={inputStyle}type="text" value={name} onChange={(e)=>setName(e.target.value)} className='input'  placeholder='Enter Product name' />
          <input style={inputStyle}type="text" value={brand} onChange={(e)=>setBrand(e.target.value)} className='input'  placeholder='Enter Product Brand' />
        </div>
        <div style={{height:'200px',marginTop:'20px'}}>
          <ReactQuill
            style={{height:'100%'}}
            theme='snow'
            className='editor'
            value={description}
            onChange={setDescription}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductMetadataForm