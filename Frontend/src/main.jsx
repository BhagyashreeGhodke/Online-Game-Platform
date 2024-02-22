//Frontend/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Theme from './Theme'
import Layout from './Layout'
import { Home, About, Contact, Github, githubInfoLoader, Register, Login } from './Components'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path= '/' element= {<Layout/>} >
      <Route path= '' element= {<Home />} />
      <Route path= 'about' element= {<About />} />
      <Route path= 'contact' element= {<Contact />} />
      <Route path='register' element= { <Register />} />
      <Route path='login' element= { <Login />} />
      <Route path='theme' element= { <Theme /> } />
      
      <Route 
      loader={ githubInfoLoader}
      path= 'github' 
      element={<Github />} 
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)



