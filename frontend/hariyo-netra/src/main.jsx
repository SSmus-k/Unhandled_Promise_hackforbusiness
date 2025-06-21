import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainLayout from './MainLayout'
import MiniLayout from './MiniLayout'
import { Home, Login, Signup, Dashboard, BusinessProfile, Subscription, NoSubscription } from './pages'
import { AppProvider } from './context/AppContext'

const routes = createBrowserRouter([
  {
    element:<MainLayout/>
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
        element: <Subscription/>
      },
      {
         path:"nosubscription",
        element: <NoSubscription/>
      }
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
