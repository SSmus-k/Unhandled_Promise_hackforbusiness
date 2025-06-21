import React from 'react'
import {Outlet} from 'react-router-dom'
import { Header, Footer } from './components'

export default function MainLayout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
