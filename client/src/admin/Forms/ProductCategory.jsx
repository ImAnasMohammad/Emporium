import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios'


const ProductCategory = ({setProduct,setStatus,category,variations}) => {

      const [categories,setCategories] = useState([]);
      const [selectedCategory,setSelectedCategory] = useState(category)

      useEffect(()=>{
            async function getAllCategoriesNames(){

                  const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/categories`);
                  if(res?.data?.success === true){
                        setCategories(res?.data?.data);
                  }else{
                        toast.error(res?.data?.msg ?? "Something went wrong")
                  }
            }

            getAllCategoriesNames()
      },[])

  const handleClickNext = ()=>{

      if(isCanMove()){
            toast.error('Please select a category');
            return;
      }
      if(variations.length<=0){
            variations = selectedCategory?.options?.map(option=>{
                  const initialValues = {
                        price:0,
                        discount:0,
                        quantity:0,
                        variation:option
                  }
                  return initialValues
            })
      }
      setProduct(prev=>prev={...prev,category:selectedCategory?._id,variations});
      setStatus(prev=>prev=prev+1);
  }


  const handleChange = (e)=>setSelectedCategory(e[0])


  const isCanMove=()=>selectedCategory === '';






  return (
    <div style={{maxWidth:'700px',margin:'0px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h4>Category</h4>
        <button 
          className="btn btn-primary"
          disabled={isCanMove()}
          onClick={handleClickNext}
        >
            Next
          </button>
      </div>
      <div style={{marginTop:'30px'}}>
      <Typeahead
            id="Categories"
            labelKey="name"
            multiple={false}
            options={categories}
            onChange={handleChange}
            clearButton={true}
            minLength={1}
            maxResults={1}
            placeholder="Choose an Category..."
            style={{
                  border:'1px solid rgba(150,150,150)',
                  borderRadius:'5px'
            }}
            defaultSelected={[category]}
      />
      </div>
    </div>
  )
}

export default ProductCategory