import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Logout } from '../components';

export default function Sidebar() {

      const {user} = useApp()
  const location = useLocation()

  const isActive = (path) => location.pathname === path
  return (
     <>
      <aside className="w-64 bg-transparent border-r-[0.5px] border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-6 text-green"><span className="text-green-600">Hariyo</span>Netra</h1>
        <nav className="space-y-4">
          {['Dashboard', 'Profile', 'Insights', 'Bin', 'Subscription'].map(item => (
            <Link to={`/${item}`} key={item} className={`block ${isActive(item)?"text-green-600":"text-gray-700"} hover:text-green-600`}>
              {item}
            </Link>
          ))}
          <Logout/>
        </nav>
      </aside>
      </>
  )
}
