import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './landingPage/LandingPage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import HowItWorks from './pages/How it works/HowItWorks'
import Features from './pages/Features/Features'
import Feedback from './pages/Feedback/Feedback'
import ErrorPage from './pages/Error Page/ErrorPage'
import Portfolio from './pages/Portfolio/Portfolio'
import Userdashboard from './pages/UserDashbaord/Userdashboard'
import Introduction from './pages/UserDashbaord/Introduction/Introduction'




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
    ,
    {
      path:"/user-portfolio",
      element: <Portfolio/>
    },
    {
      path:"/user-dashboard/*",
      element: <Userdashboard/>
    },
    {
      path:"/intro",
      element: <Introduction/>
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
