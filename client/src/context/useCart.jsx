

//context for authorization

import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';

const serverURL = process.env.REACT_APP_SERVER_BASE_URL;


const CartContext = createContext('');


const useCart =()=> useContext(CartContext);

const CartProvider = ({ children }) => {
      

    const [auth] = useAuth();
    const [cart, setCart] = useState([]);
    const [loading,setLoading] = useState(false);
    const [total,setTotal] = useState(0);

    const getCartItems = async()=>{
        setLoading(prev=>prev=true);
        try{
            const res = await axios.get(`${serverURL}/cart`);
        
            if(res?.data?.success){
                let items = res.data.data;
                let tmpTotal = 0;

                items = items.map(item=>{
                    
                    item.discountedPrice=item.discount>0?(item?.price - item.price*(item.discount/100)):item.price;
                    tmpTotal += item.discountedPrice;
                    return item;
                })
                setCart([...items]);
                setTotal(tmpTotal);
            }
        }catch(err){
            // toast.error(err?.message ?? "Something went wrong");
        }finally{
            setLoading(prev=>prev=false);
        }
    }


    const removeCartItem = async (id)=>{
        try{
          const res = await axios.delete(`${serverURL}/cart/${id}`);
    
          if(res?.data?.success){
            getCartItems()
          }else{
            console.log(res.data.msg);
            toast.error(res.data?.msg ?? "Something went wrong");
          }
        }catch(err){
          toast.error(err?.message ?? "Something went wrong");;
        }
    }


    useEffect(()=>{

        
        getCartItems();
        
    },[auth?.token])

    return (
        <CartContext.Provider value={{ loading,total,cart, setCart,getCartItems,removeCartItem } }>
        {children}
        </CartContext.Provider>
    );
  };


  export { useCart, CartProvider };
  