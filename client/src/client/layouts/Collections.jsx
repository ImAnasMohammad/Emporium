import React from 'react';
import '../assets/css/layouts/Collections.css'

const Collections = ({data}) => {
  return (
    <div className='collections-wrapper'>
      <h2 className=''>Our collections</h2>
      <div className="items-wrapper">
      {
        data?.map(item=><div className='collection-wrapper'>
            <a href={item?.url} className='shop-btn'>{item.label}</a>
            <div className="image-bg"></div>
            <div className="img-wrapper">
              <img src={item?.img} alt={item?.label} />
            </div>
          </div>
          )
      }
      </div>
    </div>
  )
}

export default Collections