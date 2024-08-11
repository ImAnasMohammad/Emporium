import React, { useEffect } from 'react'
import Layout from '../../common/Layout'
import { redirect, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const OrderReceived = () => {
    const {id} = useParams();
    const handleClick= ()=>{
        navigator.clipboard.writeText(id).then(() => {
            console.log('Text copied to clipboard');
            toast.success('Order ID copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy Order ID!');
        });
    }

    useEffect(()=>{
        const verifyId = localStorage.getItem('orderId');
        verifyId && verifyId !== id && redirect('/');
    })
  return (
    <Layout>
        <div style={{padding:'20px 0px',display:'flex',justifyContent:'center',minHeight:'70vh',flexDirection:'column',alignItems:'center'}}>
            <i className="bi bi-patch-check-fill" style={
                {
                    color:'var(--primaryBGColor)',
                    fontSize:'5rem',
                    marginBottom:'10px'
                }
            }>
            </i>
            <h2>Successfully we had received your order</h2>
            <p>Your order id is <span onClick={handleClick} style={{textDecoration:'underline dotted',color:'var(--primaryBGColor)',cursor:'pointer'}}>{id}</span></p>
        </div> 
    </Layout>
  )
}

export default OrderReceived