import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Layout from '../Layouts/Layout'
import SearchLayout from '../Layouts/SearchLayout';
import Table from '../Layouts/Table';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ConformationModel from '../components/ConformationModel';
import { Link, useNavigate } from 'react-router-dom';




const Inventory = () => {
  const [search,setSearch] = useState('');
  const [products,setProducts]= useState([]);
  const [error,setError] = useState(false);
  const [deleteProductId,setDeleteProductId] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [sort,setSort] = useState(0);
  const navigate = useNavigate();

  const tableHeadings = ["S.NO","Product Name",'Edit','Delete'];
  const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

  const getAllProducts = async(url=`${serverURL}/products/${sort}`)=>{
    setProducts(products=>products=[]);
    setIsLoading(prev=>true);
      try{
        const res = await axios.get(url);
        if(res?.data?.success===true){
          setProducts(res.data.data);
        }else{
          setError(res.data.msg ?? "Something went wrong.");
        }
      }catch(err){
        setError(err.message);
      }
      setIsLoading(prev=>false)
  
    }


  useEffect(()=>{
      getAllProducts()
  },[])


  useEffect(()=>{
      getAllProducts(`${serverURL}/products/search/${search}`)
  },[search])


  // api's function 

  const handleDelete = async(id)=>{
    setIsLoading(prev=>true);
    try{
      const res = await axios.delete(`${serverURL}/Products/${deleteProductId}`);
      if(res?.data?.success===true){
        toast.success("Category Deleted successfully.");
        setDeleteProductId(prev=>prev=null);
        getAllProducts();
      }else{
        setError(res.data.msg ?? "Something went wrong.");
      }
    }catch(err){
      setError(err.message);
    }
    setIsLoading(prev=>prev=false);
  }




  const handleSearch = (e)=>{
    setSearch(e.target.value);
    
  }


  const handleSort = async ()=>{
    setIsLoading(prev=>prev=true);
    await getAllProducts();
    setIsLoading(prev=>prev=false)
  }


  const handleDeleteProduct = (id)=> setDeleteProductId(id);

  const handleCreateProduct = ()=>navigate('product');

  

  return (
    <>
      <Layout page='Products' isLoading={isLoading}>
          <ConformationModel
            show={deleteProductId} 
            setShow={()=>setDeleteProductId(null)} 
            heading={'Delete Product'} 
            content={'Are you sure want to delete this Product'} 
            label='Delete' 
            handleClick={handleDelete}
          />
          <SearchLayout 
            search={search}
            setSearch={setSearch}
            handleSearchSearch={handleSearch}
            handleSortClick={handleSort} 
            handleCreateClick ={handleCreateProduct}
            btnLabel={'New Product'}
          >
            <SortOptions value={sort} setValue={setSort}/>
          </SearchLayout>
          <Table headings={tableHeadings}>
            {products.length>0 && !isLoading && <AllRows data={products} handleDeleteProduct={handleDeleteProduct}/>}
          </Table>
          <CheckErrorAndData Products={products} error={error}/>
      </Layout>
    </>
  )
}

const AllRows = ({data,handleDeleteProduct}) =>{
  return<>
    {
      
      data?.map((data,index)=><SingleRow data={data} key={index} sno={index} handleDeleteProduct={handleDeleteProduct}/>)
    }
  </>
}

const SingleRow = (

  {data,handleDeleteProduct,sno}

)=>{
  const navigate = useNavigate();
  return <tr>
    <td>{sno}</td>
    <td>{data?.name}</td>
    <td>
      <button onClick={()=>navigate(`product/${data?._id}`)} className='btn'>
        <i class="bi bi-pencil color-blue"></i>
      </button>
    </td>
    <td>
      <button onClick={()=>handleDeleteProduct(data?._id)} className='btn'>
        <i class="bi bi-trash-fill color-red"></i>
      </button>
      </td>
  </tr>
}


const SortOptions = ({value,setValue})=>{
  return <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
    <div className="form-check">
      <input onClick={()=>setValue(0)} checked={value===0} className="form-check-input" type="radio" name="flexRadioDefault" id="sortByOldest" />
      <label className="form-check-label"  role="button" tabindex="0" htmlFor="sortByOldest">
        Sort By Oldest
      </label>
    </div>
    <div className="form-check">
      <input onClick={()=>setValue(1)} checked={value===1} className="form-check-input" type="radio" name="flexRadioDefault" id="sortByEarliest" />
      <label className="form-check-label" role="button" tabindex="0"  htmlFor="sortByEarliest">
        Sort By Earliest
      </label>
    </div>
    <div className="form-check">
      <input onClick={()=>setValue(2)} checked={value===2}className="form-check-input" type="radio" name="flexRadioDefault" id="sortByNameAZ" />
      <label className="form-check-label" role="button" tabindex="0" htmlFor="sortByNameAZ">
        Sort By Name A to Z
      </label>
    </div>
    <div className="form-check">
      <input onClick={()=>setValue(3)} checked={value===3}className="form-check-input" type="radio" name="flexRadioDefault" id="sortByNameZA" />
      <label className="form-check-label" role="button" tabindex="0" htmlFor="sortByNameZA">
        Sort By Name Z to A
      </label>
    </div>
  </div>
}


const CheckErrorAndData=({Products,error}) =>{

  if(error)return<span>{error}</span>;

  if(Products.length === 0)return <div style={{textAlign:'center'}}>No Products found</div>
}







export default Inventory