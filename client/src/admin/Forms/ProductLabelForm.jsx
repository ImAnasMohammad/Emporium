import React, { useState } from 'react'



const ProductLabelForm = ({setProduct,setStatus,productLabel}) => {


      const [labels,setLabels] = useState(productLabel);


      const handleClickNext = ()=>{
            setProduct(prev=>prev={...prev,labels});
            setStatus(prev=>prev=prev+1)
      }

      const handleChange = (e)=>{
            if(e.target.checked){
                  setLabels(prev=>prev=[...prev,e.target.id])
            }else{
                  let temp = [...labels]?.filter(item=>item !== e.target.id);
                  setLabels(prev=>prev=[...temp])
            }
      }

  return (
    <div style={{maxWidth:'700px',margin:'0px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h4>Product Labels</h4>
        <button 
          className="btn btn-primary"
          onClick={handleClickNext}
        >
            Next
          </button>
      </div>
      <div style={{display:'flex',marginTop:'20px',gap:'20px'}}>
            <SingleLabelSelector label={'best-seller'} text={'Best Seller'} handleChange={handleChange} isExist={labels?.includes('best-seller')}/>
            <SingleLabelSelector label={'new-arrival'} text={'New Arrival'} handleChange={handleChange} isExist={labels?.includes('new-arrival')}/>
            
      </div>
    </div>
  )
}

const SingleLabelSelector = ({label,handleChange,isExist,text})=>{
      return <label htmlFor={label}
      style={
            {
                  padding:'5px 15px',
                  cursor:'pointer',
                  borderRadius:'5px',
                  display:'flex',
                  gap:'7px',
                  border:'2px solid',
                  borderColor:`${isExist?'var(--primaryBGColor)':'rgba(100,100,100,0.3)'}`
            }
      }
>
      <input type="checkbox" style={{accentColor:'var(--primaryBGColor)'}} id={label} checked={isExist} onChange={handleChange}/>
      <span style={{userSelect:'none'}}>{text}</span>
</label>
}


export default ProductLabelForm