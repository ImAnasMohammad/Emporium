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
import LazyLoadImage from '../components/LazyLoadImage';
import Pagination from '../Layouts/Pagination';


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

// Model for form create and update categories 

function FormModal({category,id=null,show,setShow,handleSubmit,isLoading}) {

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
          <CategoryForm
            isLoading={isLoading}
            id={id}
            handleSubmit={handleSubmit}
            category={category}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}


const Categories = () => {
  const [search,setSearch] = useState('');
  const [categories,setCategories]= useState([]);
  const [error,setError] = useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [totalCategories,setTotalCategories]=useState(0);
  const [editCategory,setEditCategory] = useState({
    name:'',
    options:[],
    image:{
      name:'',
      blurHash:''
    }
  });

  const [editCategoryId,setEditCategoryId] = useState(null);
  const [deleteCategoryId,setDeleteCategoryId] = useState(null);
  const [show,setShow] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [sort,setSort] = useState(0);

const tableHeadings = ["Categories Name","Image","Options",'Edit','Delete'];

const uploadImage = async (categoryTemp)=>{
    try{
      if(categoryTemp?.image?.name instanceof File){
        const formData = new FormData();
        formData.append('images',categoryTemp?.image?.name);
        const resUploadImage = await axios.post(`${serverURL}/upload`,formData);
        if(resUploadImage?.data?.success === true){
          categoryTemp.image = resUploadImage?.data?.files[0];
          return categoryTemp;
        }else{
          toast.error("Something went wrong while uploading image");
          return false;
        }
      }else{
        return categoryTemp
      }
    }catch(err){
      toast.error(err?.message);
      return false;

    }

}
  const getAllCategories = async()=>{
    setCategories(categories=>categories=[]);
    setIsLoading(prev=>true);
      try{
        const params = search==='' ?{sort,currentPage}:{sort,currentPage,search};

        const res = await axios.get(`${serverURL}/categories`,{params});
        if(res?.data?.success===true){
          setCategories(res.data.data);
          if(currentPage===1){
            setTotalCategories(Math.ceil(res?.data?.total/res?.data?.limit) ?? 0);
          }
        }else{
          setError(res.data.msg ?? "Something went wrong.");
        }
      }catch(err){
        setError(err.message);
      }
      setIsLoading(prev=>false)
  
}
  


  // api's function 

  const handleDelete = async(id)=>{
    setIsLoading(prev=>true);
    try{
      let id = deleteCategoryId;
      setDeleteCategoryId(prev=>prev=null);
      const res = await axios.delete(`${serverURL}/categories/${id}`);
      console.log(res)
      if(res?.data?.success===true){
        toast.success("Category Deleted successfully.");
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
      newCategory = await uploadImage(newCategory);
      if(!newCategory) return;
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
    setIsLoading(prev=>prev=true);
    setError(prev=>prev='')
    try{
      newCategory = await uploadImage(newCategory);
      if(!newCategory) return;
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
    setCurrentPage(1);
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

  useEffect(()=>{
    getAllCategories();
  },[search,currentPage])
  

  return (
    <>
      <Layout page='Categories' isLoading={isLoading}>
          <FormModal
            show={show} 
            setShow={setShow} 
            category={editCategory} 
            id={editCategoryId}
            handleSubmit={editCategoryId===null?handleCreate:handleEdit}
            isLoading={isLoading}
          />
          <ConformationModel
            show={deleteCategoryId} 
            setShow={()=>setDeleteCategoryId(null)} 
            heading={'Delete Category'} 
            content={'Are you sure want to delete this category ? All products related to this category will be delete.'} 
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
          <Pagination 
            total={totalCategories}
            current={currentPage}
            handlePageChange={(ind)=>setCurrentPage(ind)}
          />
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

  const options = data?.options.join(',');

  
  return <tr>
    <td>{data?.name}</td>
    <td>
      <div style={{width:'100px',overflow:'hidden',aspectRatio:'1 / 1'}}>
      <LazyLoadImage
              src={`${serverURL+"/upload/"+data?.image?.name}`}
              alt={data?.name}
              blurHash={data?.image?.blurHash}
              width={'100%'}
              style={{width:'100%',aspectRatio:'1 / 1',objectFit:'cover'}}
            />
      </div>
      </td>
    <td>{options}</td>
    {/* <td>{formattedNumber(data?.noOfProducts)}</td> */}
    <td>
      <button onClick={()=>handleEditCategory(data,data?._id)} className='btn'>
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