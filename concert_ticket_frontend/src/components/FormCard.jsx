import React from 'react'

const FormCard = ({children}) => {
  return (

    <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className="row registerCard">
            {children}
        </div>
    </div>
 
  )
}

export default FormCard