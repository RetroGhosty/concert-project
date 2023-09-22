import React from 'react'
const ProfileBackgroundHero = ({children}) => {
  return (
    <div className='bg-dark text-light p-5 row'>

      <div className='col-12 mb-5 p-5'>
          <div className='row mb-3 justify-content-between'>
            {children}

          </div>
      </div>
</div>
  )
}

export default ProfileBackgroundHero