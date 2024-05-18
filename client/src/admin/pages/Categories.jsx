import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Layout from '../Layouts/Layout'
import SearchLayout from '../Layouts/SearchLayout';
import Table from '../Layouts/Table';
import { formattedNumber } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';
import CustomSpinner from '../components/CustomSpinner';
import axios from 'axios';
import CategoryForm from '../Forms/CategoryForm';
import ConformationModel from '../components/ConformationModel';



// Model for form create and update categories 

function FormModal({category,id=null,show,setShow,handleEdit}) {

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
          <CategoryForm tempCategory={category?.name} tempOptions={category?.options} id={id} handleClick={handleEdit} />
        </Modal.Body>
      </Modal>
    </div>
  );
}


const Categories = () => {
  const [search,setSearch] = useState('');
  const [categories,setCategories]= useState(null);
  const [error,setError] = useState(false);
  const [editCategory,setEditCategory] = useState('');
  const [editCategoryId,setEditCategoryId] = useState(null);
  const [deleteCategoryId,setDeleteCategoryId] = useState(null);
  const [show,setShow] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const tableHeadings = ["Categories Name","Options",'Edit','Delete'];
  const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

  


  useEffect(()=>{
    const getData = async()=>{
      setCategories(categories=>categories=[]);
      setIsLoading(prev=>true);
        try{
          const res = await axios.get(`${serverURL}/categories`);
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
      
      getData();
      
  },[])


  // api's function 

  const handleDelete = ()=>{
    console.log('deleting category')
  }

  const handleEdit = async (newCategory,id)=>{
    const options = [...new Set(newCategory.options.split(','))].filter(ele=>ele!=='');
    setIsLoading(prev=>true);
    try{
      const res = await axios.put(`${serverURL}/categories/${id}`,{id,...newCategory,options});
      if(res?.data?.success===true){
        setCategories(res.data.data);
      }else{
        setError(res.data.msg ?? "Something went wrong.");
      }
    }catch(err){
      setError(err.message);
    }

    setIsLoading(prev=>false);
    setShow(false)
  }



  const handleSearch = (e)=>{
    setSearch(e.target.value);
    
  }

  //function for new category
  const handleClick = ()=>{
    setEditCategory('');
    setEditCategoryId(null);
    setShow(true);

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
            handleEdit={handleEdit}
          />
          <ConformationModel
            show={deleteCategoryId} 
            setShow={setDeleteCategoryId} 
            heading={'Delete Category'} 
            content={'Are you sure want to delete this category'} 
            label='Delete' 
            handleClick={handleDelete}
          />
          <SearchLayout 
            search={search} 
            handleSearch={handleSearch} 
            handleClick={handleClick} 
            btnLabel={'New Categories'}
          >
            <SortOptions/>
          </SearchLayout>
          <Table headings={tableHeadings}>
            {categories && !isLoading && <AllRows data={categories} handleEditCategory={handleEditCategory} handleDeleteCategory={handleDeleteCategory}/>}
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


const SortOptions = ()=>{
  return <div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="flexRadioDefault" id="sortByOldest" />
      <label className="form-check-label" htmlFor="sortByOldest">
        Sort By Oldest
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="flexRadioDefault" id="sortByEarliest" />
      <label className="form-check-label" htmlFor="sortByEarliest">
        Sort By Earliest
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="flexRadioDefault" id="sortByNameAZ" />
      <label className="form-check-label" htmlFor="sortByNameAZ">
        Sort By Name A to Z
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="flexRadioDefault" id="sortByNameZA" />
      <label className="form-check-label" htmlFor="sortByNameZA">
        Sort By Name Z to A
      </label>
    </div>
  </div>
}


const CheckErrorAndData=({categories,error}) =>{

  if(error)return<span>{error}</span>;

  if(!categories)return <CustomSpinner style={{marginTop:'50px'}}/>
}







export default Categories