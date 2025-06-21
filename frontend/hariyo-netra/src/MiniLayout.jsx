import React from 'react'
import {Outlet} from 'react-router-dom'
import { Footer } from './components'
export default function MiniLayout() {
  return (
    <>
    <Outlet/>
    <Footer/>
    </>
  )
}

