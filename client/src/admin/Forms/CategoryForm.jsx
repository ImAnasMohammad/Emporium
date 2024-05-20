import React, { useState } from 'react'

// css in client/style.css 

const CategoryForm = ({tempCategory='',tempOptions='',id=null,handleSubmit}) => {
    const [category,setCategory] = useState(tempCategory);
    const [options,setOptions] = useState(tempOptions);
    const [img,setImg] = useState('sdfdfs');

  return (
    <div className='category-form-wrapper'>
        <input type="text" placeholder='Enter Category name' value={category} onChange={(e)=>setCategory(e.target.value)} />
        <input type="text" placeholder='Enter Options like s,m,l,xl,xxl' value={options} onChange={(e)=>setOptions(e.target.value)} />
        <button 
          type="submit" 
          onClick={()=>handleSubmit({name:category,options,image:img},id)} 
          className='btn btn-primary' 
          disabled={
            (category==='' || options==='') ||
            (category===tempCategory && options===tempOptions)

          }>
            {id ===null ?"Create":"Save"}
        </button>
    </div>
  )
}

export default CategoryForm