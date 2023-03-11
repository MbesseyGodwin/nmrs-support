import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
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
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../../assets/images/openmrs.png')} alt="profile" />
                  <span className="count bg-success spinner-grow text-success" role="status">
                    <span class="sr-only">Loading...</span></span>

                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal"><Trans>Localhost</Trans></h5>
                  <span className='text-success'><Trans>Active</Trans></span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>To-do list</Trans></p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link text-light"><Trans>Dashboard & Navigation</Trans></span>
          </li>

          {/* dashboard */}
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>

          {/* hts */}
          <li className={this.isPathActive('/hts') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/hts">
              <span className="menu-icon"><i className="mdi mdi-test-tube-off"></i></span>
              <span className="menu-title"><Trans>HTS</Trans></span>
            </Link>
          </li>

          {/* tx_cur */}
          <li className={this.isPathActive('/tx_cur') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/tx_cur">
              <span className="menu-icon"><i className="mdi mdi-hospital"></i></span>
              <span className="menu-title"><Trans>TX_Cur</Trans></span>
            </Link>
          </li>

          {/* viral_load */}
          <li className={this.isPathActive('/viral_load') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/viral_load">
              <span className="menu-icon"><i className="mdi mdi-van-passenger"></i></span>
              <span className="menu-title"><Trans>Viral_Load</Trans></span>
            </Link>
          </li>

          {/* Retention */}
          <li className={this.isPathActive('/retention') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/retention">
              <span className="menu-icon"><i className="mdi mdi-contrast-box"></i></span>
              <span className="menu-title"><Trans>Retention</Trans></span>
            </Link>
          </li>

          {/* PBS */}
          <li className={this.isPathActive('/pbs') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/pbs">
              <span className="menu-icon"><i className="mdi mdi-thumb-up"></i></span>
              <span className="menu-title"><Trans>PBS</Trans></span>
            </Link>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link text-light"><Trans>Monitoring & Evaluation</Trans></span>
          </li>

          {/* Reports */}
          <li className={this.isPathActive('/reports') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/reports">
              <span className="menu-icon"><i className="mdi mdi-comment-arrow-right-outline"></i></span>
              <span className="menu-title"><Trans>Reports</Trans></span>
            </Link>
          </li>
          {/* content 2 */}
          <li className={this.isPathActive('/#') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/reports">
              <span className="menu-icon"><i className="mdi mdi-update"></i></span>
              <span className="menu-title"><Trans>Content 2</Trans></span>
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