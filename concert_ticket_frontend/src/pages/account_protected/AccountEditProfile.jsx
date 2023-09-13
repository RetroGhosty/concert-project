import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { isValueEmpty } from '../../utils/DataUtils'
import { EditBasicSchema } from '../../schema/EditProfileSchema'
import { PurpleButton } from '../../components/CustomizedMaterials'
import { useNavigate } from 'react-router-dom'
import ProfileBackgroundHero from '../../components/ProfileBackgroundHero'
import axiosTokenIntercept from '../../utils/AxiosInterceptor'


const AccountEditProfile = () => {
    let {userDeepDetails, setUserDeepDetails} = useContext(AuthContext)
    let [isMounted, setIsMounted] = useState(false)
    const navigate = useNavigate()

    const {handleSubmit, handleChange, handleBlur, setValues, values, errors, touched} = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            birthdate: "",
            birthplace: ""
        },
        validationSchema: EditBasicSchema,
        onSubmit: (values) => {
            console.log("it works")
            axiosTokenIntercept.patch(`/api/user/`, values)
            .then((result) => {
                if (result.status === 200){
                    navigate(-1, {replace: true})
                }
            }) 
        } 
    })

    useEffect(() => {
        if (isMounted !== true){
            axiosTokenIntercept.get(`/api/user/`)
            .then((result) => {
                setValues({
                    email: isValueEmpty(result.data['email']),
                    username: isValueEmpty(result.data['username']),
                    password: isValueEmpty(result.data['password']),
                    first_name: isValueEmpty(result.data['first_name']),
                    last_name: isValueEmpty(result.data['last_name']),
                    birthdate: isValueEmpty(result.data['birthdate']),
                    birthplace: isValueEmpty(result.data['birthplace'])
                })
              setUserDeepDetails(result.data)
              setIsMounted(true)
            })
            .catch((error) => {
                setIsMounted(false)
            })
        }
        // API Cleanup
        return (() => {
            setIsMounted(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    if (userDeepDetails !== undefined){
        return (
            <ProfileBackgroundHero>
                <div className='row justify-content-between align-items-end mb-3'>
                    <h2 className='col-12 col-lg-6 p-0 m-0 col'>Edit Profile</h2>
                    <PurpleButton className='col-3 p-2' onClick={() => {navigate("/account/changepassword")}}>Change password</PurpleButton>
                </div>
                <form onSubmit={handleSubmit} className='row border-top border-info p-3'>
                    <div className='col-12 col-lg-6 my-3'>
                        <label htmlFor="email" className='mb-1 text-warning'>Email</label>
                        <input id="email" className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'} onChange={handleChange} onBlur={handleBlur} value={values.email} disabled/>
                        {errors.email && touched.email ? <div className='feedback-invalid mt-2'>{errors.email}</div> : null}
                    </div>
                    <div className='col-12 col-lg-6 my-3'>
                        <label htmlFor="username" className='mb-1 text-warning'>Username</label>
                        <input id="username" className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'} onChange={handleChange} onBlur={handleBlur} value={values.username} />
                        {errors.username && touched.username ? <div className='feedback-invalid mt-2'>{errors.username}</div> : null}
                    </div>

                    <div className='col-12 col-lg-6 my-3'>
                        <label htmlFor="first_name" className='mb-1 text-warning'>First Name *</label>
                        <input id="first_name" className={errors.first_name && touched.first_name ? 'form-control is-invalid' : 'form-control'} onBlur={handleBlur} onChange={handleChange} value={values.first_name}/>
                        {errors.first_name && touched.first_name ? <div className='feedback-invalid mt-2'>{errors.first_name}</div> : null}
                    </div>
                    <div className='col-12 col-lg-6 my-3'>
                        <label htmlFor="last_name" className='mb-1 text-warning'>Last Name *</label>
                        <input id="last_name" className={errors.last_name && touched.last_name ? 'form-control is-invalid' : 'form-control'} onBlur={handleBlur} onChange={handleChange} value={values.last_name}/>
                        {errors.last_name && touched.last_name ? <div className='feedback-invalid mt-2'>{errors.last_name}</div> : null}
                    </div>
        
                    <div className='col-12 col-lg-6 my-3'>
                        <label htmlFor="birthdate" className='mb-1 text-warning'>Birthdate</label>
                        <input disabled placeholder="Unavailable" id="birthdate" className={errors.birthdate && touched.birthdate ? 'form-control is-invalid' : 'form-control'} onBlur={handleBlur} onChange={handleChange} value={values.birthdate}/>
                        {errors.birthdate && touched.birthdate ? <div className='feedback-invalid mt-2'>{errors.birthdate}</div> : null}
                    </div>
        
                    <div className='col-12 col-lg-6 my-3'>
                        <label htmlFor="birthplace" className='mb-1 text-warning'>Birthplace *</label>
                        <input id="birthplace" className={errors.birthplace && touched.birthplace ? 'form-control is-invalid' : 'form-control'} onBlur={handleBlur} onChange={handleChange} value={values.birthplace}/>
                        {errors.birthplace && touched.birthplace ? <div className='feedback-invalid mt-2'>{errors.birthplace}</div> : null}
                    </div>

                    <div className='col-12 d-flex align-items-end mt-4 justify-content-end'>
                        <PurpleButton className='btn btn-primary px-3 py-2' type='submit'>EDIT PROFILE</PurpleButton>     
                    </div>
                </form>

            </ProfileBackgroundHero>

      )
    } 
}

export default AccountEditProfile