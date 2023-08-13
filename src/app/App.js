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

const App = ({ location, i18n }) => {
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRouteChanged = () => {

    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (location.pathname === fullPageLayoutRoutes[i]) {
        setIsFullPageLayout(true);
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        setIsFullPageLayout(false);
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  };

  useEffect(() => {
    onRouteChanged();
  }, [location, onRouteChanged]);

  let navbarComponent = !isFullPageLayout ? <Navbar /> : "";
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : "";
  let footerComponent = !isFullPageLayout ? <Footer /> : "";

  return (
    <div className="container-scroller">
      {sidebarComponent}
      <div className="container-fluid page-body-wrapper">
        {navbarComponent}
        <div className="main-panel">
          <div className="content-wrapper bg-light">
            <DexieInsert />
            <AppRoutes />
          </div>
          <div className="bg-light py-3 fixed-bottom">{footerComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(withRouter(App));
