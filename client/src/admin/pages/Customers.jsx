import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import SearchLayout from '../Layouts/SearchLayout';
import Table from '../Layouts/Table';
import { formattedNumber } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Customers = () => {
  const [search,setSearch] = useState('');
  const [sortBy,setSortBy] = useState(0);
  const [show,setShow] = useState(false);

  const tableHeadings = ["Name","Email","Phone","Total Trips","Total Bill","Paid Bill",'Due Bill'];

  const data = [
    {
      "name": "Alice Atkins",
      "phone": "(340) 284-3245",
      "email": "convallis.erat.eget@google.net",
      "bill": 6806,
      "dueBill": 7274,
      "paidBill": 3310,
      "trips":2
    },
    {
      "name": "Nyssa Thornton",
      "phone": "(812) 907-7834",
      "email": "donec.luctus@icloud.edu",
      "bill": 7102,
      "dueBill": 1935,
      "paidBill": 9771,
      "trips":23
    },
    {
      "name": "Farrah Stevenson",
      "phone": "(737) 551-5659",
      "email": "fringilla.porttitor@icloud.ca",
      "bill": 7748,
      "dueBill": 4735,
      "paidBill": 6637,
      "trips":23
    },
    {
      "name": "Holmes Rose",
      "phone": "1-769-641-2756",
      "email": "hymenaeos.mauris@aol.couk",
      "bill": 5901,
      "dueBill": 2968,
      "paidBill": 8184,
      "trips":32
    },
    {
      "name": "Branden Sims",
      "phone": "(768) 387-9643",
      "email": "et@outlook.edu",
      "bill": 2887,
      "dueBill": 3687,
      "paidBill": 9487,
      "trips":0
    }
  ]

  const handleSearch = (e)=>{
    setSearch(e.target.value);
    
  }

  const handleClick = ()=>{

  }

  const handleSortClick = ()=>{
    setShow(prev=>!prev)
  }
  return (
    <>
    
    <SortModel show={show} setShow={setShow}/>
    <Layout page='Customers'>
        <SearchLayout search={search} handleSearch={handleSearch} handleClick={handleClick} btnLabel={'New Customer'} handleSortClick={handleSortClick}/>
        <Table headings={tableHeadings}>
          <AllRows data={data}/>
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
    <td className='color-blue'>{formattedNumber(data?.bill)}</td>
    <td className='color-green'>{formattedNumber(data?.paidBill)}</td>
    <td className='color-red'>{formattedNumber(data?.dueBill)}</td>
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