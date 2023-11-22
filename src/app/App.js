import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";
import { withTranslation } from "react-i18next";
import DexieInsert from "./shared/indexedDB/DexieInsert";
import Login from "./login/Login";

const App = ({ location, i18n }) => {
  // State to track whether the current route has a full-page layout
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);

  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effect to handle route changes and adjust layout accordingly
  useEffect(() => {
    const fullPageLayoutRoutes = []; // Add routes that should have a full-page layout
    const isFullPage = fullPageLayoutRoutes.includes(location.pathname);
    setIsFullPageLayout(isFullPage);

    // Scroll to the top on route change
    window.scrollTo(0, 0);

    // Toggle the full-page class based on the condition
    const pageBodyWrapper = document.querySelector(".page-body-wrapper");
    if (pageBodyWrapper) {
      isFullPage
        ? pageBodyWrapper.classList.add("full-page-wrapper")
        : pageBodyWrapper.classList.remove("full-page-wrapper");
    }
  }, [location.pathname]);

  // Effect to check if the user is logged in on component mount
  useEffect(() => {
    // Check if the user is logged in by looking at localStorage
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");
  }, []);

  // Callback function to handle user login
  const onLogin = () => {
    setIsLoggedIn(true);
    // Save login status to localStorage
    localStorage.setItem("isLoggedIn", "true");
  };

  // Callback function to handle user logout
  const onLogout = () => {
    setIsLoggedIn(false);
    // Remove login status from localStorage
    localStorage.removeItem("isLoggedIn");
  };

  // If the user is not logged in, render the Login component
  if (!isLoggedIn) {
    return <Login onLogin={onLogin} />;
  }

  // If the user is logged in, render the main application components
  return (
    <div className="container-scroller">
      {!isFullPageLayout && <Sidebar />}
      <div className="container-fluid page-body-wrapper">
        {!isFullPageLayout && <Navbar onLogout={onLogout} />}
        <div className="main-panel">
          <div className="content-wrapper bg-light">
            <DexieInsert />
            <AppRoutes />
          </div>
          {!isFullPageLayout && (
            <div className="bg-light py-3 fixed-bottom">
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(withRouter(App));
