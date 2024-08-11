import React, { useCallback, useEffect, useState } from "react";
import {toast } from 'react-toastify';
import LazyLoadImage from '../../admin/components/LazyLoadImage';
import Layout from '../common/Layout';

import { useParams,useNavigate } from 'react-router-dom';

// import {axios} from 'axios'
import '../assets/css/pages/product.css'
import axios from 'axios';
import StringToHtml from "../components/StringToHtml";
import {formatCurrency} from "../../utils/format";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";

const Product = () => {

  const [product,setProduct] = useState(false);
  const [activeImage,setActiveImage] = useState(0);
  const [activeVariationIndex,setActiveVariationIndex] = useState(0);
  const [adding,setAdding] = useState(false);
  const {getCartItems}=useCart();
  const {id} = useParams();
  const [auth]= useAuth();
  const redirect = useNavigate();

  const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

  const addToCart = async ()=>{

    if(auth?.token ===''){
      redirect('/join');
      return;
    }

    setAdding(true);
    try{
      const res = await axios.post(`${serverURL}/cart`,{
        product:id,
        variation:product.variations[activeVariationIndex].variation,
        quantity:1,
      })
      if(res?.data?.success){
        toast.success('Product added to cart');
        getCartItems();
      }else{
        toast.error(res?.data?.msg?? "Something went wrong");
      }
    }catch(err){
      console.log(err);
      toast.error(err?.message?? "Something went wrong");
    }finally{
      setAdding(false);
    }
  }

  useEffect(()=>{
    if( !id ){
      toast.error("Invalid Product id");
      redirect('/');
      return;
    }

    const fetchProductData = async ()=>{
        try{
            const res = await axios.get(`${serverURL}/products/getProduct/${id}`);

            if(res.data?.success){
            let data = res.data.data;
            data.images = data.images.filter(item=>item?.name !=='');
            data.images.push(data.image);
            delete data.image;
            setProduct(prev=>prev=data)
        }else{
            toast.error(res?.data?.msg ?? "Something went wrong")
        }
      }catch(err){
        toast.error(err?.message ?? "Something went wrong")
      }
    }

    fetchProductData()

    
  },[])
  return (
    <Layout>
      {product ? (
        <section>
          <div className="main">
            <div className="default gallery">
              <div className="main-product-img">
                <LazyLoadImage
                  className="active"
                  alt="Main product"
                  src={
                    serverURL + "/upload/" + product.images[activeImage].name
                  }
                  blurHash={product.images[activeImage].blurHash}
                />
              </div>
              <div className="thumb-list">
                {product.images?.map((item, index) => (
                  <div
                    key={item.blurHash}
                    className={`${index === activeImage && "active"}`}
                    onClick={()=>setActiveImage(index)}
                  >
                    <LazyLoadImage
                      className="active"
                      alt="Sub product images"
                      src={
                        serverURL +
                        "/upload/" +
                        item.name
                      }
                      blurHash={item.blurHash}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="content">
            <div className="path-product">Home / {product?.category?.name} / {product?.name}</div>
              <h3>{product?.brand}</h3>
              <h2 className="product-name">{product?.name}</h2>
              <div className="price-info">
                <span className="current-price">{
                  product?.variations[activeVariationIndex]?.discount ?formatCurrency(product?.variations[activeVariationIndex]?.price-(product?.variations[activeVariationIndex]?.price*product?.variations[activeVariationIndex]?.discount)/100):
                  formatCurrency(product?.variations[activeVariationIndex]?.price)
                }</span>
                {product?.variations[activeVariationIndex]?.discount ? <span className="discount">{product?.variations[activeVariationIndex]?.discount}% off</span>:'' }
                {product?.variations[activeVariationIndex]?.discount ? <span className="prev-price">{product?.variations[activeVariationIndex]?.price}</span> :'' }
              </div>
              <div className="select-size">
                {product?.variations?.map((variation,i)=><button key={variation?.variation} className={activeVariationIndex===i && 'active'} onClick={()=>setActiveVariationIndex(prev=>prev=i)}>{variation?.variation}</button>)}
                
              </div>
              {product?.variations[activeVariationIndex]?.quantity ===0? <div className="out-off-stock">Out of stock</div> :'' }
              <div className="add-to-cart-container">
                <button className="add-to-cart" disabled={!product?.variations[activeVariationIndex]?.quantity}  onClick={addToCart}>
                  <span>
                    <svg
                      width={22}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                        fill="#69707D"
                        fillRule="nonzero"
                      />
                    </svg>
                  </span>
                  <span>{adding?"Adding..":'Add to cart'}</span>
                </button>
              </div>
            </div>
          </div>
          <p className="product-desc">
            {<StringToHtml htmlString={product?.description} />}
          </p>
        </section>
      ) : (
        "Loading..."
      )}
    </Layout>
  );
};

export default Product;
