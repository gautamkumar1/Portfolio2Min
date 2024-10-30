import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './landingPage/LandingPage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import HowItWorks from './pages/How it works/HowItWorks'
import Features from './pages/Features/Features'
import Feedback from './pages/Feedback/Feedback'
import ErrorPage from './pages/Error Page/ErrorPage'




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      children: [
         {
      path: "/",
      element: <LandingPage/>
    },
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/register",
      element: <Register/>
    },
    {
      path:"/howitworks",
      element: <HowItWorks/>
    },
    {
      path:"/features",
      element: <Features/>
    },
    {
      path:"/feedback",
      element: <Feedback/>
    },
    {
      path:"*",
      element: <ErrorPage/>
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
