import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Layout from '../Layouts/Layout'
import SearchLayout from '../Layouts/SearchLayout';
import Table from '../Layouts/Table';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import CategoryForm from '../Forms/CategoryForm';
import ConformationModel from '../components/ConformationModel';



// Model for form create and update categories 

function FormModal({category,id=null,show,setShow,handleSubmit}) {

  const handleClose = ()=>setShow(prev=>!prev);


  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${id !== null ?'Update':'Create New '} Category`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm tempCategory={category?.name} tempOptions={category?.options} id={id} handleSubmit={handleSubmit} />
        </Modal.Body>
      </Modal>
    </div>
  );
}


const Categories = () => {
  const [search,setSearch] = useState('');
  const [categories,setCategories]= useState([]);
  const [error,setError] = useState(false);
  const [editCategory,setEditCategory] = useState('');
  const [editCategoryId,setEditCategoryId] = useState(null);
  const [deleteCategoryId,setDeleteCategoryId] = useState(null);
  const [show,setShow] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [sort,setSort] = useState(0);

  const tableHeadings = ["Categories Name","Options",'Edit','Delete'];
  const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

  const getAllCategories = async(url=`${serverURL}/categories/${sort}`)=>{
    setCategories(categories=>categories=[]);
    setIsLoading(prev=>true);
      try{
        const res = await axios.get(url);
        if(res?.data?.success===true){
          setCategories(res.data.data);
        }else{
          setError(res.data.msg ?? "Something went wrong.");
        }
      }catch(err){
        setError(err.message);
      }
      setIsLoading(prev=>false)
  
    }


  useEffect(()=>{
      getAllCategories()
  },[])
  
  useEffect(()=>{
      getAllCategories(`${serverURL}/categories/search/${search}`)
  },[search])


  // api's function 

  const handleDelete = async(id)=>{
    setIsLoading(prev=>true);
    try{
      const res = await axios.delete(`${serverURL}/categories/${deleteCategoryId}`);
      if(res?.data?.success===true){
        toast.success("Category Deleted successfully.");
        setDeleteCategoryId(prev=>prev=null);
        getAllCategories();
      }else{
        setError(res.data.msg ?? "Something went wrong.");
      }
    }catch(err){
      setError(err.message);
    }
    setIsLoading(prev=>prev=false);
  }

  const handleEdit = async (newCategory,id)=>{
    const options = [...new Set(newCategory.options.split(','))].filter(ele=>ele!=='');
    setIsLoading(prev=>true);
    try{
      const res = await axios.put(`${serverURL}/categories/${id}`,{...newCategory,options});
      if(res?.data?.success===true){
        toast.success(res?.data?.msg);
        getAllCategories();
      }else{
        setError(res.data.msg ?? "Something went wrong.");
      }
    }catch(err){
      setError(err.message);
    }
    setEditCategory(prev=>prev='')
    setEditCategoryId(prev=>prev=null)
    setIsLoading(prev=>prev=false);
    setShow(prev=>prev=false)
  }

  const handleCreate = async (newCategory)=>{
    const options = [...new Set(newCategory.options.split(','))].filter(ele=>ele!=='');
    setIsLoading(prev=>true);
    try{
      const res = await axios.post(`${serverURL}/categories`,{...newCategory,options});
      if(res?.data?.success===true){
        toast.success("Category created successfully.");
        getAllCategories();
      }else{
        setError(res.data.msg ?? "Something went wrong.");
      }
    }catch(err){
      setError(err.message);
    }
    setIsLoading(prev=>prev=false);
    setShow(prev=>prev=false)
  }




  const handleSearch = (e)=>{
    setSearch(e.target.value);
  }

  //function for new category

  const handleCreateClick = ()=>{
    setEditCategory('');
    setEditCategoryId(null);
    setShow(true);

  }

  const handleSort = async ()=>{
    setIsLoading(prev=>prev=true);
    await getAllCategories();
    setIsLoading(prev=>prev=false)
  }

  const handleEditCategory= (category,id)=>{
    setEditCategory(category);
    setEditCategoryId(id);
    setShow(true)
  }

  const handleDeleteCategory = (id)=> setDeleteCategoryId(id);

  

  return (
    <>
      <Layout page='Categories' isLoading={isLoading}>
          <FormModal
            show={show} 
            setShow={setShow} 
            category={editCategory} 
            id={editCategoryId}
            handleSubmit={editCategoryId===null?handleCreate:handleEdit}
          />
          <ConformationModel
            show={deleteCategoryId} 
            setShow={()=>setDeleteCategoryId(null)} 
            heading={'Delete Category'} 
            content={'Are you sure want to delete this category'} 
            label='Delete' 
            handleClick={handleDelete}
          />
          <SearchLayout 
            search={search}
            setSearch={setSearch}
            handleSearchSearch={handleSearch}
            handleSortClick={handleSort} 
            handleCreateClick ={handleCreateClick}
            btnLabel={'New Categories'}
          >
            <SortOptions value={sort} setValue={setSort}/>
          </SearchLayout>
          <Table headings={tableHeadings}>
            {categories.length>0 && !isLoading && <AllRows data={categories} handleEditCategory={handleEditCategory} handleDeleteCategory={handleDeleteCategory}/>}
          </Table>
          <CheckErrorAndData categories={categories} error={error}/>
      </Layout>
    </>
  )
}

const AllRows = ({data,handleEditCategory,handleDeleteCategory}) =>{
  return<>
    {
      
      data?.map((data,index)=><SingleRow data={data} key={index} handleEditCategory={handleEditCategory} handleDeleteCategory={handleDeleteCategory}/>)
    }
  </>
}

const SingleRow = (

  {data,handleEditCategory,handleDeleteCategory}

)=>{

  const options = data?.options.join(',')
  
  return <tr>
    <td>{data?.name}</td>
    <td>{options}</td>
    {/* <td>{formattedNumber(data?.noOfProducts)}</td> */}
    <td>
      <button onClick={()=>handleEditCategory({name:data?.name,options},data?._id)} className='btn'>
        <i class="bi bi-pencil color-blue"></i>
      </button>
    </td>
    <td>
      <button onClick={()=>handleDeleteCategory(data?._id)} className='btn'>
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


const CheckErrorAndData=({categories,error}) =>{

  if(error)return<span>{error}</span>;

  if(categories.length === 0)return <div style={{textAlign:'center'}}>No Categories found</div>
}







export default Categories