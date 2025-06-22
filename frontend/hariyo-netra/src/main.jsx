import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainLayout from './MainLayout'
import MiniLayout from './MiniLayout'
import { Home, Login, Signup, Dashboard, BusinessProfile,Insights,Bin,SubPage} from './pages'
import { AppProvider } from './context/AppContext'
import Subscribed from './pages/Subscribed'

const routes = createBrowserRouter([
  {
    element:<MainLayout/>,
    children:[
       {
         path:"dashboard",
        element: <Dashboard/>
      },
       {
         path:"profile",
        element: <BusinessProfile/>
      },
      {
         path:"subscription",
        element: <Subscribed/>
      },
      {
         path:"insights",
        element: <Insights/>
      },
      {
         path:"bin",
        element: <Bin/>
      },
      {
         path:"subpage",
        element: <SubPage/>
      },
    ]
  },
  {
    element:<MiniLayout/>,
    path:'/',
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"signup",
        element: <Signup/>
      },
     
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <RouterProvider router={routes}></RouterProvider>
    </AppProvider>
  </StrictMode>,
)
