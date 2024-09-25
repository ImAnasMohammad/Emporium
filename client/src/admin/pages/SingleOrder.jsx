import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Link, useParams } from 'react-router-dom';
import ProductGroup1 from '../../client/layouts/ProductsGroup';
import axios from 'axios';
import {toast} from 'react-toastify';
import { formatCurrency,formatDate,formatOrderStatus } from '../../utils/format';
import LazyLoadImage from '../components/LazyLoadImage';


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const SingleOrder = () => {
    const [loading,setLoading]=useState(false);
    const [order,setOrder]=useState({});

    const {id}=useParams();


    const getOrderDetails = async()=>{
        setLoading(true);
        try{
            const res = await axios.get(`${serverURL}/orders/${id}`);
            if(res.data.success){
                setOrder(res.data.data);
                console.log(res.data.data.orderItems);
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            toast.error('Failed to fetch order details');
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getOrderDetails()
    },[])
    return (
        <>
            <Layout page='Order' isLoading={loading} >
                <div className='single-order-page'>
                    <div className='single-sub-wrapper details-container'>
                        <div className="price-details">
                            <h3>Order Details</h3>
                            <table>
                                <tr>
                                    <td>Order Id:</td>
                                    <td>{order?._id}</td>
                                </tr>
                                <tr>
                                    <td>Total Items:</td>
                                    <td>{order?.orderItems?.length}</td>
                                </tr>
                                <tr>
                                    <td>Total Bill:</td>
                                    <td>{formatCurrency(order?.totalPrice ?? 0)}</td>
                                </tr>
                                <tr>
                                    <td>Order Date:</td>
                                    <td>{formatDate(order?.dateOrder)}</td>
                                </tr>
                                <tr>
                                    <td>Order Status:</td>
                                    <td>{formatOrderStatus(order?.status)}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="address-container">
                            <h3>Shipping Address</h3>
                            <table>
                                <tr>
                                    <td>Name:</td>
                                    <td>{order?.userId?.name}</td>
                                </tr>
                                <tr>
                                    <td>Phone:</td>
                                    <td><Link to={order?.phone}>{order?.phone}</Link></td>
                                </tr>
                                <tr>
                                    <td>pin code:</td>
                                    <td>{order?.pincode}</td>
                                </tr>
                                <tr>
                                    <td>Land mark:</td>
                                    <td>{order?.landMark}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{order?.address}</td>
                                </tr>
                                <tr>
                                    <td>city:</td>
                                    <td>{order?.city}</td>
                                </tr>
                                <tr>
                                    <td>district:</td>
                                    <td>{order?.district}</td>
                                </tr>
                                <tr>
                                    <td>state:</td>
                                    <td>{order?.state}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className='single-sub-wrapper'>
                        <h3>Order Items details</h3>
                        <table>
                            <thead>
                                <tr>
                                    <td>Image</td>
                                    <td>name</td>
                                    <td>Order Price</td>
                                    <td>Order variation</td>
                                    <td>Order quantity</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order?.orderItems?.map(item=><SingleRow key={item?._id} item={item}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
  )
}


const SingleRow = ({item})=>{
    const {price,product,variation,quantity} = item;
    return<tr>
        <td>
            {
                (product && product?.image?.name && product?.image?.blurHash) ?
                <LazyLoadImage
                    src={`${serverURL+"/upload/"+product?.image?.name}`}
                    alt={item?.name}
                    blurHash={product?.image?.blurHash}
                    width={100}
                    style={{aspectRatio:'3 / 4',width:'100%',objectFit:'cover'}}
                />:'Looks like product not found'
            }
        </td>
        <td>{product?.name ? product?.name :"Product not found"}</td>
        <td>{formatCurrency(price)}</td>
        <td>{variation}</td>
        <td>{quantity}</td>
    </tr>
}



export default SingleOrder