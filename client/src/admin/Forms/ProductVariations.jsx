import React, { useState } from 'react'
import Table from '../Layouts/Table';



const ProductImagesForm = ({setProduct,setStatus,productVariations}) => {


      const [variations,setVariations] = useState(productVariations);


      const handleClickNext = ()=>{
            setProduct(prev=>prev={...prev,variations});
            setStatus(prev=>prev=prev+1)
      }

  return (
    <div style={{maxWidth:'700px',margin:'0px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h4>Variations</h4>
        <button 
          className="btn btn-primary"
          onClick={handleClickNext}
        >
            Next
          </button>
      </div>
      <div style={{marginTop:'30px'}}>
      {
            <Variations variations={variations} setVariations={setVariations}/>
      }
    </div>
    </div>
  )
}

const Variations = ({setVariations,variations})=>{


      const handleChangeInput =(name,value,index)=>{

            let tempArr = [...variations];

            tempArr[index][name] = value;


            setVariations([...tempArr])
      }

      
      return<Table headings={['Variation','Price (in Rs)','Quantity','Discount (in %)']}>
            {
                  variations?.map((variation,index)=><EachVariationDetails handleChangeInput={handleChangeInput} variation={variation} index={index} key={variation?.option}/>)
            }
      </Table>
}

const EachVariationDetails = ({index,variation,handleChangeInput})=>{


      const handleChange = (e)=>handleChangeInput(e.target.name,parseInt(e.target.value),index);



      return <tr>
            <td><h5>{variation?.variation}</h5></td>
            <td><input type="number"  className='input' name='price' value={variation?.price} onChange={handleChange}/></td>
            <td><input type="number"  className='input' name='quantity' value={variation?.quantity} onChange={handleChange}/></td>
            <td><input type="number"  className='input' name='discount' value={variation?.discount} onChange={handleChange}/></td>
      </tr>
}

export default ProductImagesForm