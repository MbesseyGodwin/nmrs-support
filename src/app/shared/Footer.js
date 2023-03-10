import React, { Component } from 'react';
// import { Trans } from 'react-i18next';
class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="container-fluid text-uppercase">
          <div className="d-sm-flex justify-content-center justify-content-sm-between py-0 w-100">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © <a href="#" target="_blank" rel="noopener noreferrer">caritas health informatics </a>2023</span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">for  <a href="#" target="_blank" rel="noopener noreferrer"> analysis </a> purposes only  </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;