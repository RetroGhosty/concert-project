import React, { useEffect, useState, useContext } from 'react'
import FormInput from '../components/FormInput'
import FormCard from '../components/FormCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { PurpleButton } from '../components/CustomizedMaterials'

const RegisterPage = () => {

  const {setServerAlert} = useContext(AuthContext)
  const navigate = useNavigate()

  let [inputValues, setinputValues] = useState({
    email : "",
    username : "",
    password1 : "",
    password2 : ""
  })
  let [fieldErrors, setFieldErrors] = useState({})
  let [isAcceptible, setisAcceptible] = useState(false)





  const updateValue = (e) => {
    setinputValues({...inputValues, [e.target.name] : e.target.value})
  }
  
  const validation = (formValue) => {
    let errors = {}
    if (formValue.email === "test"){
      errors.email = "Please input a valid email"
    }
    if (formValue.username.length < 8){
      errors.username = "Username should not be less than 8 characters"
    }
    if (formValue.username === formValue.password1){
      errors.password1 = "Password should not be the same as username"
    }
    if (formValue.password1.length < 8){
      errors.password1 = "Password should not be less than 8 characters"
    }
    if (formValue.password1 !== formValue.password2){
      errors.password2 = "Password must be the same"
    }
    return errors
  }


  const validateForm = (e) => {
    e.preventDefault()
    setFieldErrors(validation(inputValues))
  }

  useEffect(() => {
    if (Object.keys(fieldErrors).length === 0){
      setisAcceptible(true)
      if (isAcceptible === true){
        SubmitRegForm()
      }
    } else{
      setisAcceptible(false)
    }
    // eslint-disable-next-line 
  }, [fieldErrors])

  
  const SubmitRegForm = async () => {
    let body = {
      email : inputValues.email,
      username : inputValues.username,
      password : inputValues.password2
    }

    try {
      let result = await axios.post('http://localhost:8000/api/register/user', body, {'content-type' : 'application/json'})
      setisAcceptible(false)
      setServerAlert({alertHeader: "success", alertMessage: result.data.Response})
      navigate("/login", { replace: true });
    } catch (error) {
      let objKeys = Object.keys(error['response'].data)
      let errorResponse = {}
      for (let objKey in objKeys){
        let messageKey = objKeys[objKey]
        let messageResponse = error['response'].data[objKeys[objKey]][0]
        errorResponse[messageKey] = messageResponse
      }
      setFieldErrors(errorResponse)
      setisAcceptible(false)
    }
  }

  return (
    <FormCard>
      <div className='p-5 bg-dark text-light rounded'>
        <form onSubmit={validateForm} method="post">
          <h1 className='tester'>RegisterPage</h1>
          <FormInput key="0" label="Email" inputID="email" inputType="text" updateValue={updateValue} errorMessage={fieldErrors.email}/>
          <FormInput key="1" label="Username" inputID="username" inputType="text" updateValue={updateValue} errorMessage={fieldErrors.username}/>
          <FormInput key="2" label="Password" inputID="password1" inputType="password" updateValue={updateValue} errorMessage={fieldErrors.password1}/>
          <FormInput key="3" label="Confirm password" inputID="password2" inputType="password" updateValue={updateValue} errorMessage={fieldErrors.password2}/>
          <PurpleButton type="submit" className='px-5 py-2 mt-3'>Submit</PurpleButton>
        </form>
      </div>
    </FormCard>
  )
}

export default RegisterPage