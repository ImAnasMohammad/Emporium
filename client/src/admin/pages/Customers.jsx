import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import SearchLayout from '../Layouts/SearchLayout';
import Table from '../Layouts/Table';
import { formatCurrency } from '../../utils/format';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const Customers = () => {
  const [search,setSearch] = useState('');
  const [sortBy,setSortBy] = useState(0);
  const [show,setShow] = useState(false);
  const [users,setUsers] = useState({});
  const [loading,setLoading] = useState(false);

  const tableHeadings = ["Name","Email","Phone","Total Trips","Total Bill","Paid Bill",'Due Bill'];

  

  const handleSearch = (e)=>{
    setSearch(e.target.value);
    
  }

  const handleClick = ()=>{

  }

  const handleSortClick = ()=>{
    setShow(prev=>!prev)
  }


  const getUsersData = async ()=>{
    try{
        setLoading(true);
        const response = await axios.get(`${serverURL}/users`);
        // setUsers(response.data);
        console.log(response)

    }catch(err){
        console.error(err);
        toast.error(err.response.data.message ?? err.message??'Something went wrong.')
    }finally{
        setLoading(false);
    }
  }


  useEffect(()=>{
    getUsersData();
  },[])
  return (
    <>
    
    <SortModel show={show} setShow={setShow}/>
    <Layout page='Customers'>
        <SearchLayout search={search} handleSearch={handleSearch} handleClick={handleClick} btnLabel={'New Customer'} handleSortClick={handleSortClick}/>
        <Table headings={tableHeadings}>
          <AllRows data={[]}/>
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
  return <tr>
    <td>{data?.name}</td>
    <td><Link to={`mailto:${data?.email}`}>{data?.email}</Link></td>
    <td><Link to={`tel:+${data?.phone}`}>+{data?.phone}</Link></td>
    <td>{data?.trips}</td>
    <td className='color-blue'>{formatCurrency(data?.bill)}</td>
    <td className='color-green'>{formatCurrency(data?.paidBill)}</td>
    <td className='color-red'>{formatCurrency(data?.dueBill)}</td>
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


export default Customers