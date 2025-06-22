import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {useApp} from '../context/AppContext'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const {login} = useApp()

  const navigate = useNavigate()
const handleSubmit = async (e)=>{
  e.preventDefault()
  try{
    const loggedInUser = await login(email, password)
    if(loggedInUser){
      navigate('/dashboard')
      setError(false)
    }
  }catch(err){
    setError(true)
  }
  
}

  return (
    <form onSubmit={handleSubmit} className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#e6f8e6] to-white">
      <Link to={'/'}>
        <img
          src="/Images/logo.png"
          alt="Logo"
          className="fixed top-4 right-4 w-40 h-30 object-contain z-50"
        />
      </Link>

      {/* Larger box container */}
      <div className="bg-base-200 rounded-xl shadow-md w-[1000px] h-[600px] flex overflow-hidden">
        {/* Left side bigger box */}
        <div className="flex-grow bg-base-100 rounded-l-xl p-6 flex flex-col">
          {/* Top half with image */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <img
              src="/Images/favicon.png"
              alt="Favicon"
              className="max-h-50 max-w-50 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
              "Sustainable habits, smarter businesses"
            </h2>
            <p className="text-gray-600 text-center max-w-xs">
              Empower your company with eco-friendly practices that boost efficiency and impact.
            </p>
          </div>
        </div>

        {/* Right side login box */}
        <div className="bg-green-600 text-white p-6 flex flex-col rounded-r-xl w-[400px] h-full relative">
          {/* Curved top with leaf icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <img src="/Images/favicon.png" alt="Leaf Icon" className="w-14 h-14 object-contain" />
          </div>

          {/* Main content */}
          <div className="flex-grow flex flex-col justify-center mt-8">
            <h1 className="text-white font-bold text-2xl text-center mb-8">Log In</h1>

            <fieldset className="space-y-4 w-full">
              <label className="block text-sm font-medium text-left">Email:</label>
              <input
              required
                type="text"
                className="input w-full h-[50px] text-black"
                placeholder="johndoe@xyz.com"
                value={email}
                onChange={(e)=>(setEmail(e.target.value))}
              />

              <label className="block text-sm font-medium text-left">Password:</label>
              <input
              required
                type={showPassword ? 'text' : 'password'}
                className="input w-full h-[50px] text-black"
                placeholder="•••••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              {/* Show Password + Forgot */}
              <div className="flex justify-between items-center text-sm mt-2">
                <label className="flex items-center space-x-2 select-none">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="checkbox checkbox-sm"
                  />
                  <span>Show password</span>
                </label>
                <a href="#" className="text-white underline text-xs">Forgot password?</a>
              </div>
              {error && <div role="alert" className="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Warning: Invalid email address or password!</span>
      </div>}

              {/* Login button */}
              <button type='submit' className="btn bg-stone-700 text-white w-full mt-4 hover:bg-gray-800">Log In</button>
            </fieldset>

            {/* OR + social icons */}
            <div className="text-center my-4 text-sm">Or Sign In with</div>
            <div className="flex justify-center space-x-4">
              <img src="/Images/facebook.svg" alt="Facebook" className="w-8 h-8 bg-white rounded-full" />
              <img src="/Images/google.svg" alt="Google" className="w-8 h-8  bg-white rounded-full" />
            </div>

            {/* Sign up link */}
            <p className="text-sm text-center mt-6">
              Don’t have an account? <Link to={'/signup'} className="underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      
    </form>
  )
}
