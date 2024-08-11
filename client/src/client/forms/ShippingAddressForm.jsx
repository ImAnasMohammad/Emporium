import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import axios from 'axios';
import { toast } from 'react-toastify';
const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const ShippingAddressForm = ({user,address,setUser,setAddress,setIsSaved,isSaved}) => {
    const [loading,setLoading] = useState({
        dataLoading:false,
        dataSaved:false
    });
    const [isChanged,setIsChanged] = useState(false);


    const handleChange = (e,isBasicDetails)=>{
        setIsChanged(true);
        setIsSaved(false);
        if(isBasicDetails){
            setUser({...user,[e.target.name]:e.target.value})
        }else{
            setAddress({...address,[e.target.name]:e.target.value})
        }
    }


    const isCanSave = ()=>{
        return (
            user?.phone=== '' || address?.street=== '' || address?.city=== '' || address?.state=== '' || address?.pincode=== '' || address?.landMark=== '' || !isChanged
        )
    }
    async function getShippingDetails(){
        try{
            setLoading(true);
            const res = await axios.get(`${serverURL}/users/shipping-details`)

            if(res?.data?.success){
                console.log(res.data.data)
                setUser({...res.data.data.user});
                setAddress({...res.data.data.address});
                setIsSaved(true);
            }else{
                toast.error(res.data?.msg?? "Something went wrong")
            }


        }catch(err){
            console.log(err)
            toast.error(err?.response?.data?.message ?? "Something went wrong")
        }finally{
            setLoading(false);
        }
    }


    const handleSave = async ()=>{
        try{
            setLoading(prev=>prev={dataLoading:false,dataSaved:true});

            const addId = address._id;

            const URL = `${serverURL}/address`;

            

            const res = addId===null  ?await axios.post(URL,{...address}):await axios.put(URL+"/"+addId,address);

            

            if(res?.data?.success){
                if(!addId){
                    setAddress({...address,_id:res.data.data._id});
                }
                toast.success("Address successfully saved.");
                setIsSaved(true);
            }else{
                toast.error(res.data?.msg?? "Something went wrong")
            }


        }catch(err){
            console.log(err)
            toast.error(err?.response?.data?.message ?? "Something went wrong")
        }finally{
            setLoading(prev=>prev={dataLoading:false,dataSaved:false});
        }
    }

    useEffect(()=>{

        getShippingDetails();
        // eslint-disable-next-line
    
    },[])

  return (
    <>
    

        {
            loading.dataLoading?<div className="col-md-8 order-md-1" style={{display:'flex',justifyContent:'center'}}>Loading...</div>:
            <div className="col-md-8 order-md-1">
                <div style={{display:'flex',justifyContent:'space-between',paddingRight:'5px'}}>
                    <h4 className="mb-3">Billing address</h4>
                    <button
                        className='btn btn-primary'
                        style={{height:'fit-content'}}
                        disabled={isCanSave() || loading.dataSaved || isSaved}
                        onClick={handleSave}
                    >save</button>
                </div>
                <form className="needs-validation">
                    <div className="row">
                        <div className=" mb-3">
                            <Input
                                label={'Name'}
                                type={'text'}
                                name="name"
                                required={true}
                                value={user.name}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Input
                                label={'email'}
                                type={'email'}
                                name="mail"
                                required={true}
                                value={user.mail}
                                disabled={true}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <Input
                                label={'Mobile number'}
                                type={'number'}
                                name="phone"
                                required={true}
                                value={address.phone}
                                onChange={(e)=>handleChange(e,false)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <Input
                            label={'address'}
                            type={'text'}
                            required={true}
                            name="address"
                            value={address.address}
                            onChange={(e)=>handleChange(e,false)}
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Input
                                label={'state'}
                                type={'text'}
                                value={address.state}
                                onChange={(e)=>handleChange(e,false)}
                                required={true}
                                name="state"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <Input
                                label={'district'}
                                type={'text'}
                                value={address.district}
                                onChange={(e)=>handleChange(e,false)}
                                required={true}
                                name="district"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Input
                                label={'City'}
                                type={'text'}
                                value={address.city}
                                onChange={(e)=>handleChange(e,false)}
                                required={true}
                                name="city"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <Input
                                label={'Pin Code'}
                                type={'number'}
                                value={address.pincode}
                                onChange={(e)=>handleChange(e,false)}
                                required={true}
                                name="pincode"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <Input
                            label={'land mark'}
                            type={'text'}
                            required={true}
                            name="landMark"
                            value={address.landMark}
                            onChange={(e)=>handleChange(e,false)}
                        />
                    </div>
                </form>
            </div>
        }
    </>
  )
}

export default ShippingAddressForm