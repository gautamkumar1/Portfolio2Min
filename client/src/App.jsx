import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './landingPage/LandingPage'



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      children: [
         {
      path: "/",
      element: <LandingPage/>
    }
      ]
    }
  ])
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
