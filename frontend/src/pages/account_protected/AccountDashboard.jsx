import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { PurpleButton } from '../../components/CustomizedMaterials.jsx'
import { useNavigate } from 'react-router-dom'
import { isValueEmpty } from '../../utils/DataUtils'
import ProfileBackgroundHero from '../../components/ProfileBackgroundHero'
import axiosTokenIntercept from '../../utils/AxiosInterceptor'
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs'

const AccountDashboard = () => {
  
  let { logout, userDeepDetails, setUserDeepDetails } = useContext(AuthContext)
  let [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    axiosTokenIntercept.get(`/api/user/`)
    .then((result) => {
      setUserDeepDetails(result.data)
      setIsMounted(true)
    })
    .catch((error) => {
      logout()
      setIsMounted(false)
    })
    // API Cleanup
    return (() => {
      setIsMounted(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  let navigate = useNavigate()


  if (isMounted !== false){
    return (
      <div className='bg-dark text-light p-5 row'>
        <div className='col-12 mb-5 p-5'>
          <div className='row mb-3 justify-content-between align-items-end'>
            <CustomBreadCrumbs/>
            <h2 className='col-12 col-lg-6 p-0 m-0'>Profile</h2>
            <PurpleButton className='col-12 col-lg-2 p-2' onClick={() => {navigate("edit")}}>Edit profile</PurpleButton>
          </div>
          <div className='row border-top border-info p-3'>
            <div className='col-12 col-lg-6 my-3'>
              <div className='mb-1 text-warning'>Email</div>
              <span className='h5'>{isValueEmpty(userDeepDetails.email, "N/A")}</span>
            </div>
            <div className='col-12 col-lg-6 my-3'>
              <div className='mb-1 text-warning'>Username</div>
              <span className='h5'>{isValueEmpty(userDeepDetails.username, "N/A")}</span>
            </div>
            <div className='col-12 col-lg-6 my-3'>
              <div className='mb-1 text-warning'>First Name</div>
              <span className='h5'>{isValueEmpty(userDeepDetails.first_name, "N/A")}</span>
            </div>
            <div className='col-12 col-lg-6 my-3'>
              <div className='mb-1 text-warning'>Last Name</div>
              <span className='h5'>{isValueEmpty(userDeepDetails.last_name, "N/A")}</span>
            </div>

            <div className='col-12 col-lg-6 my-3'>
              <div className='mb-1 text-warning'>Birthdate</div>
              <span className='h5'>{isValueEmpty(userDeepDetails.birthdate, "N/A")}</span>
            </div>

            <div className='col-12 col-lg-6 my-3'>
              <div className='mb-1 text-warning'>Birthplace</div>
              <span className='h5'>{isValueEmpty(userDeepDetails.birthplace, "N/A")}</span>
            </div>
          </div>
  
        </div>
        <div className='col-12 mb-5 p-5'>
          <div className='row mb-3 justify-content-between align-items-end'>
            <h2 className='col-12 col-lg-6 p-0 m-0'>Billing</h2>
            <PurpleButton className='col-12 col-lg-2 p-2'>Edit billing details</PurpleButton>
          </div>
          <div className='row border-top border-info p-3'>
            <div className='col-12 col-lg-6 my-3'>
              <h1>Unavailable</h1>
            </div>
          </div>
        </div>
      </div>
    )
  } else{
    return(
      <ProfileBackgroundHero> 
               
      </ProfileBackgroundHero>
  )}
}

export default AccountDashboard