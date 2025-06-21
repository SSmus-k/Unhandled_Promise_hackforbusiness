import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainLayout from './MainLayout'
import MiniLayout from './MiniLayout'
import Home from './pages/Home'

const routes = createBrowserRouter([
  {
    element:<MainLayout/>
  },
  {
    element:<MiniLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      // {
      //   path:"/login",
      //   element:<Login/>
      // },
      // {
      //   path:"/signup",
      //   element: <Signup/>
      // }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
