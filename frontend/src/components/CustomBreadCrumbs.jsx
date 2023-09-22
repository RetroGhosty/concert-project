import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';

const CustomBreadCrumbs = () => {
  return (
    <div className='customBreadCrumb mb-5'>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink to={"/account"} className="customBreadLink">
          Account settings
        </NavLink>

        <NavLink to={"/account/edit"} className="customBreadLink">
          Edit Profile
        </NavLink>
        
        <NavLink to={"/account/edit/changepassword"} className="customBreadLink">
          Change password
        </NavLink>
      </Breadcrumbs>
    </div>
  )
}

export default CustomBreadCrumbs