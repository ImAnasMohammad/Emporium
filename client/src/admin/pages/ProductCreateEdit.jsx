import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import ProgressStatusBar from '../components/ProgressStatusBar';
import ProductMetadataForm from '../Forms/ProductMetadataForm';
import ProductImagesForm from '../Forms/ProductImagesForm';
import ProductVariations from '../Forms/ProductVariations';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ProductCategory from '../Forms/ProductCategory';
import ProductLabelForm from '../Forms/ProductLabelForm';
import { useNavigate } from 'react-router-dom';
const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const ProductCreateEdit = () => {

  const { id } = useParams() ?? null;

  const [status,setStatus] = useState(0);
  const [product,setProduct] = useState({
    name:'',
    brand:'',
    description:'',
    image:{
      name:'',
      blurHash:''
    },
    images:[{
      name:'',
      blurHash:''
    },{
      name:'',
      blurHash:''
    },{
      name:'',
      blurHash:''
    }],
    category:'',
    labels:[],
    variations:[]
  });

    const [isLoading,setIsLoading] = useState(false);
    const [isCompleted,setIsCompleted] = useState(false);


    useEffect(()=>{
      async function getProductData(){
        try{
          setIsLoading(prev=>prev=true);
            if(id){
              const res = await axios.get(`${serverURL}/products/getProduct/${id}`);
              if(res?.data?.success){
                setProduct(res.data?.data)
              }else{
                toast.error(res?.data?.msg ?? "Something went wrong")
              }
            }
          }catch(err){
            toast.error(err?.message)
          }  
          setIsLoading(prev=>prev=false);
        }

      getProductData();
    },[])


    const ProductForms = [
      <ProductMetadataForm
        setStatus={setStatus}
        setProduct={setProduct}
        metaData={{
          name:product?.name,
          brand:product?.brand,
          description:product?.description
        }}
      />,
      <ProductImagesForm
        setProduct={setProduct}
        setStatus={setStatus}
        img={
          {
            image:product?.image,
            images:[...product?.images]
          }
        }
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />,
      <ProductCategory
          setProduct={setProduct}
          setStatus={setStatus}
          category={product?.category}
          variations={product?.variations}
      />,
      <ProductVariations
        setProduct={setProduct}
        setStatus={setStatus}
        productVariations={product?.variations}
      />,
      <ProductLabelForm
        setProduct={setProduct}
        setStatus={setStatus}
        productLabel={product?.labels}
      />,
      <ProductUploading
        product={product}
        id={id}
        setIsCompleted={setIsCompleted}
        isCompleted={isCompleted}
        setIsLoading={setIsLoading}
      />
    ]

  return (
    <>
      <Layout page='Products' isLoading={isLoading}>
          <ProgressStatusBar status={status} progressItems={['Metadata',"Images",'Variations','Product Uploaded']}/>
          <div style={{width:'100%',marginTop:'50px'}}>
            {
              !isLoading && ProductForms[status]
            }
          </div>
      </Layout>
    </>
  )
}


const ProductUploading = ({product,id,setIsLoading,isCompleted,setIsCompleted})=>{

    const navigate = useNavigate();

    const handleReload = ()=>{
      navigate('/admin/inventory/product');
    }

  const handleClick = async () => {
    setIsLoading(prev=>prev=true);
    const res =  id? await axios.put(`${serverURL}/products/${id}`,product): await axios.post(`${serverURL}/products`,product);
    if(res?.data?.success){
      toast.success(`Product ${id?'updated':'created'}`);
      setIsCompleted(prev=>prev=true)
    }else{
      toast.error(res?.data?.msg ?? "Something went wrong");
    }
    setIsLoading(prev=>prev=false);
    
  }
  return<div style={{padding:'20px 0px',display:'flex',justifyContent:'center'}}>
      {
        isCompleted?<div style={{display:'flex',alignItems:'center',flexDirection:'column',gap:'10px'}}>
            <i className="bi bi-patch-check-fill" style={
              {
                color:'var(--primaryBGColor)',
                fontSize:'3rem'
                }
              }>
            </i>
            <div style={{fontSize:'2rem'}}>
                Product {`${id?"Updated":"Created"}`}

                {/* <div style={{marginTop:'20px',display:'flex',justifyContent:'center'}}>
                    <button className='btn btn-primary' onClick={handleReload}>Add new product</button>
                </div> */}

            </div>
        </div>:<button className='btn btn-primary' style={{margin:'auto'}} onClick={handleClick}>{`${id?'Update':'create'}`} product</button>
      }
  </div>
}





export default ProductCreateEdit