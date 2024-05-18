import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const CustomSpinner = ({style={}}) => {
  style = {
    width:'100%',
    display:'flex',
    justifyContent:'center',
    ...style
  }
  return <div style={style}><Spinner style={{color:'var(--primaryBGColor)'}} animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>
  </div> 
}

export default CustomSpinner
