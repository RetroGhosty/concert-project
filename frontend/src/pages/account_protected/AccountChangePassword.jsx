import React, { useContext, useEffect, useState } from 'react'
import ProfileBackgroundHero from '../../components/ProfileBackgroundHero'
import { useFormik } from 'formik'
import { ChangePasswordSchema } from '../../schema/ChangePasswordSchema'
import AuthContext from '../../context/AuthContext'
import axiosTokenIntercept from '../../utils/AxiosInterceptor'
import { PurpleButton } from '../../components/CustomizedMaterials'
import * as bcryptjs from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs'

const AccountChangePassword = () => {
    const {user} = useContext(AuthContext)

    const navigate = useNavigate()

    let [fetchedHashedPassword, setFetchedHashedPassword] = useState(undefined)
    let [currentPasswordError, setcurrentPasswordError] = useState(null)

    useEffect(() => {
        // eslint-disable-next-line
        let loading = true
        const apiRequest = async () => {
            if (true){
              await axiosTokenIntercept.get(`/api/userpw/`)
              .then((response) => {
                  setFetchedHashedPassword(response.data['password'])
              })
            }
        }
        apiRequest()
        return () => {
            loading = false
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate])

    const {handleSubmit, handleChange, handleBlur, values, errors, touched} = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword1: "",
            newPassword2: ""
        },
        validationSchema: ChangePasswordSchema,
        onSubmit: (values) => {
            setcurrentPasswordError(undefined)
            bcryptjs.compare(values.currentPassword, fetchedHashedPassword, async (err, res) => {
                if (res !== true){
                    setcurrentPasswordError("Incorrect password")
                } else{
                    setcurrentPasswordError(undefined)
                    const userpassword = {
                        password: values.newPassword2
                    }
    
                    await axiosTokenIntercept.patch(`/api/userpw/${user['user_id']}/`, userpassword)
                    .then((result) => {
                        navigate("/account")
                    })
                }
            })
        },
    })


    const ValidatePassword = (errorCurrentPassword, touchedCurrentPassword) => {
        if (errorCurrentPassword && touchedCurrentPassword){
            return 'form-control is-invalid'
        } 
        
        if (currentPasswordError){
            return 'form-control is-invalid'
        }
        return 'form-control'
    }

    const ValidationResponse = (error) => {
        if (currentPasswordError){
            return currentPasswordError
        }
        return error
    }


  return (
    <ProfileBackgroundHero Title="Change password">
        <CustomBreadCrumbs/>
        <h2 className='col-12 col-lg-6 p-0 mb-3'>Change password</h2>
        <form onSubmit={handleSubmit} className='row border-top border-info p-3'>
            <div className='col-12 col-lg-6 my-3'>
                <div className='mb-3'>
                    <label htmlFor="currentPassword" className='mb-1 text-warning fw-bold'>Current password</label>
                    <input id="currentPassword" className={ValidatePassword(errors.currentPassword, touched.currentPassword, values.currentPassword)} onChange={handleChange} onBlur={handleBlur} value={values.currentPassword}/>
                    {ValidationResponse(errors.currentPassword) && touched.currentPassword ? <div className='feedback-invalid mt-2'>{ValidationResponse(errors.currentPassword)}</div> : null}
                </div>

                <div className='mb-3'>
                    <label htmlFor="newPassword1" className='mb-1 text-warning fw-bold'>New Password</label>
                    <input id="newPassword1" className={errors.newPassword1 && touched.newPassword1 ? 'form-control is-invalid' : 'form-control'} onChange={handleChange} onBlur={handleBlur} value={values.newPassword1}/>
                    {errors.newPassword1 && touched.newPassword1 ? <div className='feedback-invalid mt-2'>{errors.newPassword1}</div> : null}
                </div>

                <div className='mb-3'>
                    <label htmlFor="newPassword2" className='mb-1 text-warning fw-bold'>Confirm Password</label>
                    <input id="newPassword2" className={errors.newPassword2 && touched.newPassword2 ? 'form-control is-invalid' : 'form-control'} onChange={handleChange} onBlur={handleBlur} value={values.newPassword2}/>
                    {errors.newPassword2 && touched.newPassword2 ? <div className='feedback-invalid mt-2'>{errors.newPassword2}</div> : null}
                </div>
                <PurpleButton className='px-3 py-2 mt-4' type='submit'>Change Password</PurpleButton>     
            </div>
            
        
        </form>
    </ProfileBackgroundHero>
  )
}

export default AccountChangePassword

// <input id="email" className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'} onChange={handleChange} onBlur={handleBlur} value={values.email} disabled/>
//{errors.email && touched.email ? <div className='feedback-invalid mt-2'>{errors.email}</div> : null}