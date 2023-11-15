import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';

/**
 * Sidebar component that represents the navigation menu.
 * @param {object} props - React component props, including location for route information.
 * @returns {JSX.Element} - Rendered Sidebar component.
 */
const Sidebar = ({ location }) => {
  // Local state to manage active menu items
  const [activeMenu, setActiveMenu] = useState(null);

  /**
   * Toggles the active state of the menu item.
   * @param {string} menu - Menu item identifier.
   */
  const toggleMenuState = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  /**
   * Resets the menu state on route change.
   */
  const onRouteChanged = () => {
    setActiveMenu(null);
  };

  /**
   * Checks if a given path is currently active.
   * @param {string} path - Path to check for activity.
   * @returns {boolean} - True if the path is active, false otherwise.
   */
  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  /**
   * Renders a menu item.
   * @param {string} path - Path associated with the menu item.
   * @param {string} iconClass - CSS class for the menu item icon.
   * @param {string} title - Title of the menu item.
   * @returns {JSX.Element} - Rendered menu item.
   */
  const renderMenuItem = (path, iconClass, title) => {
    return (
      <li className={isPathActive(path) ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'} key={path}>
        <Link className="nav-link" to={path} onClick={() => toggleMenuState(path)}>
          <span className="bg-secondary px-2 rounded mr-2"><i className={`text-dark fa-solid fa-${iconClass}`}></i></span>
          <span className="menu-title text-light"><Trans>{title}</Trans></span>
        </Link>
      </li>
    );
  };

  // Effect to handle route changes
  useEffect(() => {
    onRouteChanged();
  }, [location]);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <h1 className="sidebar-brand brand-logo display-1 h1 text-light">NMRS <span className='text-danger'>SUPPORT</span></h1>
        <h1 className="sidebar-brand brand-logo-mini h1 text-light">N<span className='text-danger'>S</span></h1>
      </div>

      <ul className="nav">
        {/* Profile Section */}
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal"><Trans>localhost</Trans></h5>
                <span className='text-success'><Trans>Active</Trans></span>
              </div>
            </div>
          </div>
        </li>

        {/* Menu Items */}
        {renderMenuItem('/dashboard', 'home', 'Dashboard')}
        {renderMenuItem('/hts', 'vial', 'HTS')}
        {renderMenuItem('/tx_cur', 'truck-medical', 'TxCur')}
        {renderMenuItem('/viral_load', 'virus', 'Viralload')}
        {renderMenuItem('/retention', 'magnifying-glass', 'Retention')}
        {renderMenuItem('/pbs', 'fingerprint', 'PBS')}
        {renderMenuItem('/reports', 'flag', 'Reports')}
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
