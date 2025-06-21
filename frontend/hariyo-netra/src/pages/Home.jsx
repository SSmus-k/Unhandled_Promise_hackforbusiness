import React from 'react'
import { About } from '../components'
import {Link} from 'react-router-dom'
import Chart1 from '../components/Chart1'

export default function Home() {
  return (
    <>
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold"><img src="/Images/hariyo1.png" alt="" /></h1>
      <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white mb-4 p-6"> 
    <p>"Sustainable habits, Smarter businesses"</p>
    </blockquote>
      <Link to={'/signup'} className="btn text-white  bg-green-700">Get Started</Link>
    </div>
  </div>
</div>
<About/>
</>
  )
}
