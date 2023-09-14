import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


function ProtectedOrganizerViews() {
  const {user} = useContext(AuthContext)
  if (user !== undefined){
    return user.isOrganizer === true ? <Outlet/> : <Navigate to={"/"}/>
  } else{
    return <Navigate to={"/"}/>
  }
}

export default ProtectedOrganizerViews