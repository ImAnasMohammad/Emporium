import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/useAuth'
import Layout from '../../common/Layout';
import '../../assets/css/pages/my-orders.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomSpinner from '../../../admin/components/CustomSpinner';
import LazyLoadImage from '../../../admin/components/LazyLoadImage';
import { formatCurrency } from '../../../utils/format';

const serverURL = process.env.REACT_APP_SERVER_BASE_URL;
const MyOrders = () => {
    const [auth] = useAuth();

    const [orders,setOrders]= useState([]);
    const [loading,setLoading] = useState(false);

    const getMyOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${serverURL}/orders/getMyOrders`, { headers: auth.headers });
            
            if(response?.data?.success){
                console.log(response?.data?.data)
                setOrders(response?.data?.data);
            }else{
                console.log(response?.data?.msg);
                toast.error(response?.data?.msg ?? 'Something went wrong')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message?? error?.message?? 'Something went wrong')
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getMyOrders();
    },[])
    return (
        <Layout>
            <div className='my-orders-main-wrapper'>

                <h3 style={{ marginLeft: '20px' }}>My Orders</h3>
                <div className="my-orders-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {
                        loading?<CustomSpinner/>:orders?.length<=0?'No orders found':(
                            orders?.map(order=>(
                                <SingleOrder key={order?.id}  order={order} />
                            ))
                        )
                    }
                </div>
                
            </div>
        </Layout>
    )
}

const SingleOrder = ({ order }) => {
    return (
        <Link className='order' to={`/profile/my-orders/${order?.id}`}>
            <div className='single-order-item'>
                <div className='order-item-details'>
                    <div className='order-item-image'>
                        <LazyLoadImage
                            src={`${serverURL + "/upload/" + order?.product?.image?.name}`}
                            alt={order?.product?.name}
                            blurHash={order?.product?.image?.blurHash}
                            width={'100%'}
                            style={{ aspectRatio: '3 / 4', width: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className='order-item-data'>
                        <div className='order-item-name'>{order?.product?.name}SDFSDFSDFSFSDFDSF</div>
                        <div className='order-item-variation'>Variation: {order?.variation}</div>
                        <div className='order-item-quantity'>Quantity: {order?.quantity}</div>
                    </div>
                </div>
                <div className='order-item-footer'>
                    <div className='order-item-price'>{formatCurrency(order?.price)}</div>
                    <div className='order-item-status'>
                        {order?.status ===0 && <span className='pending'>Pending...</span>}
                        {order?.status ===1 && <span className='cancel-requested'>Cancel Requested</span>}
                        {order?.status ===2 && <span className='cancel'><i className="bi bi-x-circle"></i> <span>Canceled</span></span>}
                        {order?.status ===3 && <span className='delivered'><i className="bi bi-check-circle"></i> <span>Delivered</span></span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MyOrders