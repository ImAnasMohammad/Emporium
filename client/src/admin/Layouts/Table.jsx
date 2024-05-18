import React from 'react'

const Table = ({headings,children}) => {
  return (
    <div className='admin-table-wrapper'>
    <table className="table">
        <thead>
            <tr>
                {
                    headings?.map((heading,index)=><th scope="col" style={{color:'var(--primary)'}}key={index}>{heading}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
</div>
  )
}

export default Table