import React from 'react'

const FormInput = ({label, inputID, inputType, updateValue, errorMessage}) => {
  return (
    <div className='mb-3'>
        <label htmlFor={inputID} className='form-label'>{label}: </label>
        <input type={inputType} name={inputID} id={inputID} className='form-control' required="True" onChange={updateValue}/>
        <span className='text-danger'>{errorMessage}</span>
    </div>
  )
}

export default FormInput