import React from 'react'
import { useApp } from '../context/AppContext'
import {Link} from 'react-router-dom'


export default function Logout() {
    const {logout} = useApp()

  return (
    <>
    <Link onClick={logout} to={'/'} className='text-green-600 font-semibold' >Log Out</Link>
    </>
  )
}
