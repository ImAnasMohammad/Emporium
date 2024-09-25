import React, { useState } from 'react'
import Layout from '../../common/Layout'
import ShippingAddressForm from '../../forms/ShippingAddressForm';
import CheckOutCart from '../../components/CheckOutCart';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCart } from '../../../context/useCart';
import { useNavigate } from 'react-router-dom';

const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const CheckOut = () => {

    const redirect = useNavigate();


    const [user,setUser]=useState({
        name: '',
        mail: ''
    });

    const [isSaved,setIsSaved] = useState(false);
    const [placing,setPlacing] = useState(false);
    const {cart, loading} = useCart();

    const [address,setAddress]= useState({
        address: '',
        city: '',
        state: '',
        pincode: '',
        district:'',
        landMark:'',
        _id:null,
        phone:''
    })

    

    const handleProceed=async (e)=>{
        if(loading){
            return;
        }
        try{
            setPlacing(true);
            const res = await axios.post(`${serverURL}/orders`,{
                address:address.address,
                city:address.city,
                state:address.state,
                pincode:address.pincode,
                district:address.district,
                landMark:address.landMark,
                phone:address.phone,
                orderItems:cart
            })
            if(res.data?.success){
                console.log(res?.data?.msg)
                toast.success(res?.data?.msg ?? "Order placed successfully.");
                setIsSaved(true);
                localStorage.setItem('orderId',res.data.id);
                redirect('/profile/order-received/'+res.data.id);
            }else{
                toast.error(res.data?.msg?? "Something went wrong")
            }
        }catch(err){
            console.log(err);
            toast.error(err?.response?.data.msg || "Something went wrong.");
        }finally{

            setPlacing(false);

        }
        
        
    }
    
    

    
  return (
<Layout>
    <div className="container" style={{marginTop:'50px'}}>
        <div className="row">
            <ShippingAddressForm user={user} setUser={setUser} address={address} setAddress={setAddress} setIsSaved={setIsSaved} isSaved={isSaved}/>
            <CheckOutCart products={cart} handleClick={handleProceed} isSaved={isSaved} loading={placing}/>
        </div>    
    </div>
</Layout>
  )
}


export default CheckOut