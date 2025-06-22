import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../context/AppContext'

export default function Signup() {

  const navigate = useNavigate()
  const {setUser} = useApp()
  const [emailError, setEmailError] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
  })

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (name === "email") {
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }
};

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('/api/signup', formData)
      const newUser = res.data.user
      setUser(newUser)
      localStorage.setItem('user',JSON.stringify(newUser))
      navigate('/dashboard')
    }catch(err){
     console.log(err);
     
    }
    
  }

  return (
    <form onSubmit={handleSubmit} className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#e6f8e6] to-white">
      <Link to={'/'}>
        <img
          src="/Images/logo.png"
          alt="Logo"
          className=" fixed top-4 right-4 w-40 h-30 object-contain z-50"
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
            <h1 className="text-white font-bold text-2xl text-center mb-8">Sign Up</h1>

            <fieldset className="space-y-4 w-full">

                <label className="block text-sm font-medium text-left">Name:</label>
              <input
              required
              name='name'
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="input w-full h-[50px] text-black"
                placeholder="John Doe"
              />
{emailError && (
  <p className="text-red-500 text-sm mt-1">{emailError}</p>
)}
              <label className="block text-sm font-medium text-left">Email:</label>
              <input
              required
              name='email'
                value={formData.email}
                onChange={handleChange}
                type="text"
                className="input w-full h-[50px] text-black"
                placeholder="johndoe@xyz.com"
              />

              <label className="block text-sm font-medium text-left">Password:</label>
              <input
              required
              name='password'
                type={showPassword ? 'text' : 'password'}
                className="input w-full h-[50px] text-black"
                  value={formData.password}
                onChange={handleChange}
                placeholder="•••••••••••"
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
              </div>

              {/* Login button */}
            <button type='submit' className="btn bg-stone-700 text-white w-full mt-4 hover:bg-gray-800">Sign Up</button>
            </fieldset>

            {/* Sign up link */}
            <p className="text-sm text-center mt-6">
              Already have an account? <Link to={'/login'} className="underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
