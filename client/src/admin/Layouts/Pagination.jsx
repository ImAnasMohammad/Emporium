import React from 'react'

const Pagination = ({current,total,handlePageChange}) => {
  return (
    <div className='pagination-wrapper' style={{maxWidth:'100%'}}>
        {
            Array.from({length:total}).map((_,index)=>{
                return <button key={index} className={index+1 === current ? 'active' : ''} onClick={()=>handlePageChange(index+1)}>{index+1}</button>
            })
        }
    </div>
  )
}

export default Pagination