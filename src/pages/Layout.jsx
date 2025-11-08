import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser()

  return user ?  (
    <div className='flex flex-col h-screen bg-[#252525] text-[#E6E6E6]'>

      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-[#696969]'>
        <img
          className="w-32 cursor-pointer mt-2 mb-2"
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
        />

        {sidebar
          ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-[#E6E6E6] sm:hidden cursor-pointer'/>
          : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-[#E6E6E6] sm:hidden cursor-pointer'/>}
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-[#252525] overflow-y-auto p-6'>
          <Outlet/>
        </div>
      </div>

    </div>
  ) :

  (
    <div className='flex items-center justify-center h-screen'>
        <SignIn/>
    </div>
  )
}

export default Layout
