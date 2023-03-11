import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'spectre.css/dist/spectre.min.css';
// import 'tailwindcss/dist/tailwind.min.css';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Dashboarding = lazy(() => import('./dashboard/Dashboarding'));
const Hts = lazy(() => import('./hts/Hts'));
const Tx_cur = lazy(() => import('./tx_cur/Tx_cur'));
const Pbs = lazy(() => import('./pbs/Pbs'));
const Reports = lazy(() => import('./reports/Reports'));



class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/dashboarding" component={ Dashboarding } />
          <Route path="/hts" component={ Hts } />
          <Route path="/tx_cur" component={ Tx_cur } />
          <Route path="/pbs" component={ Pbs } />
          <Route path="/reports" component={ Reports } />
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;