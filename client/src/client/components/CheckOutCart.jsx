import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/format';

const CheckOutCart = ({products,handleClick,isSaved,loading}) => {
    
    const [total,setTotal] = useState(0);
  return (
        <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
                {products?.map((product) =><Item key={product.id} product={product} setTotal={setTotal}/>)}
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Total (INR)</strong>
                    <strong>{formatCurrency(total)}</strong>
                </li>
            </ul>
            <button className="btn btn-primary" disabled={!isSaved || loading} style={{width:'100%',padding:'20px'}} onClick={handleClick}>{`${loading?'Order placing...':'Proceed'}`}</button>
        </div>
  )
}


const Item = ({product,setTotal})=>{
    const {name,variation,price,discount} = product;
    const discountedCost = discount>0?price-(price*discount/100):price;

    
    useEffect(()=>{
        setTotal(prev=>prev+discountedCost);
    },[])

    return<li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <Link style={{color:'var(--primaryColor)'}}><h6 className="my-0">{name}</h6></Link>
                <small className="text-muted" style={{textTransform:'uppercase'}}>{variation}</small>
            </div>
            <span className="text-muted">{formatCurrency(discountedCost)}</span>
        </li>
}


export default CheckOutCart