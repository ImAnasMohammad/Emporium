import React from 'react'
import '../assets/css/layouts/ProductGroup2.css'
import Animate from './Animate'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../common/numberFormat'

export const ProductGroup1 = ({heading,products,tag="",style}) => {
  return (
    <div className="product-group2">
        <h3>{heading}</h3>
        <div className="product-group">
            {products?.map((item,index)=><SingleProduct tag={tag} style={style} item={item} key={index}/>)}
        </div>
    </div>
  )
}


const SingleProduct = ({item,tag,style})=>{
    return<Animate><Link to="/home"><div className="product-item">
        {tag && <div style={style} className="tag">{tag}</div>}
        <img src={item?.img} alt="dsfsdfs" />
        <div className="product-content">
            <div className="product-name"><abbr title={item?.name}>{item?.name}</abbr></div>
            <div className="product-price">{item?.discount>0 && <del>{formatCurrency(item?.price)}</del>}{formatCurrency(item?.price-((item?.price*item?.discount)/100))}</div>
        </div>
    </div></Link></Animate>
}