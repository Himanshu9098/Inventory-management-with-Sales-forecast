import React from 'react'
import Main from '../../components/admin-dashboard/main.jsx'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'

const adminDash = () => {
  const navigate=useNavigate()
  return (
  <div className='items-left'>
      <Navbar profileImage={"/assets/Dashboard/user.png"} username="Admin" onLogout={()=>{navigate(-1)}}/>
    <Main/>  
  </div>
  )
}

export default adminDash