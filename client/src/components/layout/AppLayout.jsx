import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

function AppLayout() {
  const location = useLocation();

  // Check if the current route should hide the Navbar and Footer
  const hideLayout = (
    location.pathname === "/preview-portfolio" ||
    location.pathname.startsWith("/user-dashboard") ||  
    location.pathname.startsWith("/personal-portfolio")     
  );

  return (
    <div>
      {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </div>
  );
}

export default AppLayout;
