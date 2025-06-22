import React from 'react'
import { useApp } from '../context/AppContext'
import {Link, useNavigate} from 'react-router-dom'


export default function Logout() {

  const navigate = useNavigate()
    const {logout} = useApp()

    const logout1 = async ()=>{
      await logout()
      navigate('/')
    }

  return (
    <>
    <Link onClick={logout1}  className='text-green-600 font-semibold' >Log Out</Link>
    </>
  )
}
