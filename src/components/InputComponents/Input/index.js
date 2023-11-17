import React from 'react'
import "./index.css"

const Input = ({label,placeholder,type,value,handleInputChange,required}) => {
    
  return (
    <div className='label-container'>
    <label htmlFor={label} className="label-name" > {label} </label>
    <input placeholder={placeholder} type={type} value={value} 
    onChange={(e)=>handleInputChange(e.target.value)} id={label} className='input-text' required={required} />

    </div>
  )
    
}


export default  Input 