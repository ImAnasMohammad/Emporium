import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import SearchLayout from '../Layouts/SearchLayout';
import Table from '../Layouts/Table';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { formatCurrency, formatDate } from '../../utils/format';


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const Orders = () => {
  const [search,setSearch] = useState('');
  const [sortBy,setSortBy] = useState(0);
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(false);
  const [show,setShow] = useState(false);

  const tableHeadings = ["Order Id","Name","Phone","Total Items","Total Bill",'Order Date','Order Status'];

  const handleSearch = (e)=>{
    setSearch(e.target.value);
    
  }

  const handleClick = ()=>{

  }

  const handleSortClick = ()=>{
    setShow(prev=>!prev)
  }

  const getAllOrders = async()=>{
    try{
        setLoading(true);
        const res = await axios.get(`${serverURL}/orders/getAllOrders`);
        if(res?.data?.success){
            setOrders(res?.data?.data);
            
        }else{
            toast.error(res?.data.msg?? "Something went wrong.");
        }

    }catch(err){
        console.error(err);
        toast.error(err.message ?? err.response.data.msg ?? "Something went wrong.")

    }finally{
        setLoading(false);
    }
  }

  useEffect(()=>{
    getAllOrders();

  },[]);
  return (
    <>
    
        <SortModel show={show} setShow={setShow}/>
        <Layout page='Customers' isLoading={loading} >
            <SearchLayout search={search} handleSearch={handleSearch} handleClick={handleClick} btnLabel={''} handleSortClick={handleSortClick}/>
            <Table headings={tableHeadings}>
                <AllRows data={orders}/>
            </Table>
        </Layout>
    </>
  )
}

const AllRows = ({data}) =>{
  return<>
    {
      data?.map((data,index)=><SingleRow data={data} key={index}/>)
    }
  </>
}

const SingleRow = ({data})=>{
    console.log(data)
  return <tr>
    <td style={{maxWidth:'100px',overflow:'hidden',textOverflow:"ellipsis",whiteSpace:'nowrap'}}>
        <Link to={`${data._id}`}>{data?._id}</Link>
    </td>
    <td>{data?.userId?.name}</td>
    <td><Link to={`tel:+${data?.phone}`}>+{data?.phone}</Link></td>
    <td>{data?.items}</td>
    <td className='color-green'>{formatCurrency(data?.totalPrice)}</td>
    <td>
        {formatDate(data?.dateOrder)}
    </td>
    <td>
        <select name="" id="" style={{padding:'5px'}}>
            <option value="0">Pending</option>
            <option value="1">Packed</option>
            <option value="2">Delivered</option>
            <option value="3">Cancelled</option>
            <option value="4">Returned</option>
            <option value="5">Refunded</option>
            <option value="6">Partially Paid</option>
            <option value="7">Partially Delivered</option>
            <option value="8">Partially Returned</option>
            <option value="9">Partially Refunded</option>
            <option value="10">Completed</option>
            <option value="11">Failed</option>
            <option value="12">Cancelled (Return Requested)</option>
            <option value="13">Returned (Return Requested)</option>
            <option value="14">Refunded (Return Requested)</option>
        </select>
    </td>
    
  </tr>
}

function SortModel({show,setShow}) {

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} style={{width:'100%'}}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <button variant="secondary" onClick={handleClose}>
        Close
      </button>
      <button variant="primary" onClick={handleClose}>
        Save Changes
      </button>
    </Modal.Footer>
  </Modal>
  );
}


export default Orders