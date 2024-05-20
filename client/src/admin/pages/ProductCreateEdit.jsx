import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import ProgressStatusBar from '../components/ProgressStatusBar';
import { lazy } from 'react';

const ProductMetadataForm = lazy(()=>import('../Forms/ProductMetadataForm'));


// import ProductMetadataForm from '../Forms/ProductMetadataForm';


// {
//   "description":"An shirt mobile which is nothing like shirt",
//   "name":"My product 4",
//   "brand":"guchi",
//   "image":"image url link",
//   "images":["image1 url","image 2 url"],
//   "category":"6628b62a8bcc41b96b962fa5",
//   "variatons":[
//       {
//           "variation":"S",
//           "price":240,
//           "quntity":0,
//           "discount":0
//       },
//       {
//           "variation":"M",
//           "price":2400,
//           "quntity":0,
//           "discount":0
//       }
//   ]
// }

const ProductCreateEdit = () => {

  const [status,setStatus] = useState(0);
  const [product,setProduct] = useState({});

    const [isLoading,setIsLoading] = useState(false);

    const ProductForms = [
      <ProductMetadataForm/>
    ]

  return (
    <>
      <Layout page='Products' isLoading={isLoading}>
          <ProgressStatusBar status={status} progressItems={['Metadata',"Images",'Variations','Product Uploaded']}/>
          <div style={{width:'100%',marginTop:'50px'}}>
            {
              ProductForms[status]
            }
          </div>
      </Layout>
    </>
  )
}






export default ProductCreateEdit