import React from 'react'
import '../assets/css/layouts/ProductGroup2.css'
import Animate from './Animate'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/format'
import LazyLoadImage from '../../admin/components/LazyLoadImage'
import img from '../assets/images/productsNotFound.jpg'



const serverURL = process.env.REACT_APP_SERVER_BASE_URL;



export const ProductGroup1 = ({ heading, products, tag = "", style, headingStyle }) => {
    return (
        <div className="product-group2">
            <h3 style={headingStyle}>{heading}</h3>
            <div className="product-group">
                {products?.map(item => <SingleProduct tag={tag} style={style} item={item} key={item?._id} />)}
            </div>
            {products?.length <= 0 && <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <img src={img} className="productNotFound" alt='Products not found' style={{ width: '300px' }} />
                <h4>Products Not Found</h4>
            </div>}
        </div>
    )
}


const SingleProduct = ({ item, tag, style }) => {
    const { price, discount } = item?.variations[0]
    return <Animate>
        <Link to={`/product/${item._id}`}>
            <div className="product-item">
                {tag && <div style={style} className="tag">{tag}</div>}
                <LazyLoadImage
                    src={`${serverURL + "/upload/" + item?.image?.name}`}
                    alt={item?.name}
                    blurHash={item?.image?.blurHash}
                    width={'100%'}
                    style={{ aspectRatio: '3 / 4', width: '100%', objectFit: 'cover' }}
                />
                <div className="product-content">
                    <div className="product-name"><abbr title={item?.name}>{item?.name}</abbr></div>
                    <div className="product-price">
                        {
                            discount > 0 ? <>
                                <del>{formatCurrency(price)}</del>
                                {formatCurrency(price - ((price * discount) / 100))}
                            </> : formatCurrency(price)
                        }
                    </div>
                    <Available variations={item?.variations} />
                </div>
            </div>
        </Link>
    </Animate>
}


const Available = ({ variations }) => {
    return <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        {variations?.map(item => <SingleAvailable item={item} key={item?.variation} />)}
    </div>
}


const SingleAvailable = ({ item }) => {
    return item?.quantity > 0 && <span style={
        {
            color: '#fff',
            backgroundColor: 'var(--primaryBGColor)',
            flex: '0 0 0',
            fontSize: '14px',
            padding: '2px 5px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase'
        }
    }>{item?.variation}</span>
}