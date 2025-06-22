import React from 'react'
import {Outlet} from 'react-router-dom'
import { Header, Footer, Sidebar } from './components'
import ProtectedRoute from './protectedRoute'

export default function MainLayout() {
  return (
    <ProtectedRoute>
    <div className='flex'>
      <Sidebar/>
      <Outlet/>
    </div>
    <Footer/>
    </ProtectedRoute>
  )
}
