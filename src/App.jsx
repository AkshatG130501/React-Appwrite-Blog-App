import './App.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./features/authentication/authSlice"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false);
    })
  },[])

  return !loading ? (<>
    <div className='w-full'>
      <Header/>
      <main>
        <div>Content</div>
      </main>
      <Footer/>
    </div>
  </>) : (<div className='flex justify-center font-bold text-3xl'>Loading...</div>)
}

export default App
