import React from 'react'
import { UseDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authentication/authSlice'

const LogoutBtn = () => {

  const dispatch = UseDispatch();

  const logoutHandler = () => {
    authService.logout().then(()=>{
        dispatch(logout());
    })
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn