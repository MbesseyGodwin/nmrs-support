import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <h1 className="sidebar-brand brand-logo display-1 h1 text-light">NMRS <span className='text-danger'>SUPPORT</span></h1>
          <h1 className="sidebar-brand brand-logo-mini h1 text-light">N<span className='text-danger'>S</span></h1>
        </div>
        <ul className="nav fixed">
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

          {/* dashboard */}
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'}>
            <Link className="nav-link" to="/dashboard">
              <span className="bg-secondary px-2 rounded mr-2"><i className="text-dark fa-solid fa-home"></i></span>
              <span className="menu-title text-light"><Trans>Dashboard</Trans></span>
            </Link>
          </li>

          {/* hts */}
          <li className={this.isPathActive('/hts') ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'}>
            <Link className="nav-link" to="/hts">
              <span className="bg-secondary px-2 rounded mr-2"><i class="text-dark fa-solid fa-vial"></i></span>
              <span className="menu-title text-light"><Trans>HTS</Trans></span>
            </Link>
          </li>

          {/* tx_cur */}
          <li className={this.isPathActive('/tx_cur') ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'}>
            <Link className="nav-link" to="/tx_cur">
              <span className="bg-secondary px-2 rounded mr-2"><i class="text-dark fa-solid fa-truck-medical"></i></span>
              <span className="menu-title text-light"><Trans>TxCur</Trans></span>
            </Link>
          </li>

          {/* viral_load */}
          <li className={this.isPathActive('/viral_load') ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'}>
            <Link className="nav-link" to="/viral_load">
              <span className="bg-secondary px-2 rounded mr-2"><i class="text-dark fa-solid fa-virus"></i></span>
              <span className="menu-title text-light"><Trans>Viralload</Trans></span>
            </Link>
          </li>

          {/* Retention */}
          <li className={this.isPathActive('/retention') ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'}>
            <Link className="nav-link" to="/retention">
              <span className="bg-secondary px-2 rounded mr-2"><i class="text-dark fa-solid fa-magnifying-glass"></i></span>
              <span className="menu-title text-light"><Trans>Retention</Trans></span>
            </Link>
          </li>

          {/* PBS */}
          <li className={this.isPathActive('/pbs') ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'}>
            <Link className="nav-link" to="/pbs">
              <span className="bg-secondary px-2 rounded mr-2"><i class="text-dark fa-solid fa-fingerprint"></i></span>
              <span className="menu-title text-light"><Trans>PBS</Trans></span>
            </Link>
          </li>

          {/* Reports */}
          <li className={this.isPathActive('/reports') ? 'nav-item menu-items my-1 active' : 'nav-item menu-items my-1'}>
            <Link className="nav-link" to="/reports">
              <span className="bg-secondary px-2 rounded mr-2"><i class="text-dark fa-solid fa-flag"></i></span>
              <span className="menu-title text-light"><Trans>Reports</Trans></span>
            </Link>
          </li>

        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);