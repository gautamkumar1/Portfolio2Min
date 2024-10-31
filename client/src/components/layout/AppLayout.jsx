import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet,useLocation} from 'react-router-dom'


function AppLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/user-portfolio";
  return (
    <>
      <div>
      {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </div>
    </>
  )
}

export default AppLayout