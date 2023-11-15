import React, { useEffect } from 'react';
import BackToTop from './BackToTop';
import PushData from './PushData';

const Navbar = () => {
  useEffect(() => {
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove('sidebar-icon-only');
    };
  }, []);

  // Toggle the offcanvas sidebar
  const toggleOffcanvas = () => {
    const sidebarOffcanvas = document.querySelector('.sidebar-offcanvas');
    if (sidebarOffcanvas) {
      sidebarOffcanvas.classList.toggle('active');
    }
  };

  return (
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        {/* Navbar brand */}
        <h1 className="sidebar-brand brand-logo-mini h1 text-light">
          N<span className="text-danger">S</span>
        </h1>
      </div>
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        {/* Toggle button for collapsing sidebar */}
        <button
          className="navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle('sidebar-icon-only')}
        >
          <span className="mdi mdi-menu"></span>
        </button>

        {/* Search form */}
        <ul className="navbar-nav w-100">
          <li className="nav-item w-100">
            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
              <input type="text" className="form-control" placeholder="Search NMRS Support" />
            </form>
          </li>
        </ul>

        {/* Toggle button for offcanvas sidebar on smaller screens */}
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <span className="mdi mdi-format-line-spacing"></span>
        </button>

        {/* Container for additional components on the right */}
        <div className="container justify-content-end">
          {/* Component for pushing data */}
          <PushData />
          
          {/* Component for scrolling back to top */}
          <BackToTop />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
