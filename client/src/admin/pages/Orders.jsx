import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import SearchLayout from '../Layouts/SearchLayout';
import Table from '../Layouts/Table';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { formatCurrency, formatDate } from '../../utils/format';
import Pagination from '../Layouts/Pagination';


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const Orders = () => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [cancelRequests, setCancelRequests] = useState(0);

    const tableHeadings = ["Order Id", "Name", "Phone", "Total Items", "Total Bill", 'Order Date', 'Order Status'];

    const handleSearch = (e) => {
        setSearch(e.target.value);

    }

    const handleClick = () => {

    }

    const handleSortClick = () => {
        setShow(prev => !prev)
    }

    const getAllOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${serverURL}/orders/getAllOrders/${currentPage}/${10}/${sortBy}`);
            if (res?.data?.success) {
                setOrders(res?.data?.data);
                setTotalPages(res?.data?.totalPages);
                setTotalPages(res?.data?.totalPages);
                setCancelRequests(res?.data?.cancelRequests);

            } else {
                toast.error(res?.data.msg ?? "Something went wrong.");
            }

        } catch (err) {
            console.error(err);
            toast.error(err.message ?? err.response.data.msg ?? "Something went wrong.")

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllOrders();

    }, []);

    useEffect(() => {
        getAllOrders();

    }, [currentPage, sortBy]);



    return (
        <>
            <SortModel show={show} setShow={setShow} />
            <Layout page='Orders' isLoading={loading} >
                <SearchLayout search={search} handleSearch={handleSearch} handleClick={handleClick} btnLabel={''} handleSortClick={handleSortClick} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '30px 30px 0px 0px' }}>
                    <Link to={'/admin/orders/cancel-requests'} style={{ color: 'var(--primaryBGColor)' }}>Order Cancel Requests({cancelRequests})</Link>
                </div>
                <Table headings={tableHeadings}>
                    {
                        orders?.map((data, index) => <SingleRow data={data} key={index} setLoading={setLoading}/>)
                    }
                </Table>
                {
                    !loading && orders?.length <= 0 && <div className='text-center pt-3'> No orders received yet.</div>
                }
                <Pagination
                    total={totalPages}
                    current={currentPage}
                    handlePageChange={(ind) => setCurrentPage(ind)}
                />
            </Layout>
        </>
    )
}

const SingleRow = ({ data,setLoading }) => {
    const [status,setStatus]=useState(data?.status ?? 0);

    const handleStatusChange = async(e)=>{
        try{
            let {value} = e.target;
            setStatus(parseInt(value));
            if(!value)return;
            setLoading(true);
            const res = await axios.put(`${serverURL}/orders/updateStatus/${data?._id}`,{status:value});
            if(res?.data?.success){
                toast.success("Status updated successfully.");
            }else{
                toast.error(res?.data.msg?? "Something went wrong.");
            }
        }catch(err){
            console.error(err);
            toast.error(err.message?? err.response.data.msg?? "Something went wrong.");
        }finally{

            setLoading(false);
        }
        
    }

    
    return <tr>
        <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap' }}>
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
            {
                data?.status === 5?<span>Order has been canceled</span>:<select value={status} onChange={handleStatusChange} style={{ padding: '5px' }}>
                    <OrderOptions status={status}/>
                </select>
            }
            
        </td>

    </tr>
}

function SortModel({ show, setShow }) {

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} style={{ width: '100%' }}>
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

const OrderOptions = ({status})=>{
        return<>
            <option value="0">Pending</option>
            <option value="1">Received</option>
            <option value="2">Packed</option>
            <option value="3">Decline</option>
            <option value="10">Completed</option>
            {
                status === 4 && <option value="5">Accept cancellation</option>
            }
        </>
}


export default Orders