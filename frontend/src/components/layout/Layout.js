import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = ({isUserLoggedin,setIsUserLoggedin}) => {
  
  return (
    <div className=''>
    <Navbar isUserLoggedin={isUserLoggedin} setIsUserLoggedin={setIsUserLoggedin}/>
    <div className="m-1">
    <Outlet/>
    </div>
    </div>
  )
}

export default Layout
