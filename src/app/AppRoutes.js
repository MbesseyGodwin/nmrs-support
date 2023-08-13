import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Dashboarding = lazy(() => import('./dashboard/Dashboarding'));
const Hts = lazy(() => import('./hts/Hts'));
const Tx_cur = lazy(() => import('./tx_cur/Tx_cur'));
const ViralLoad = lazy(() => import('./viral_load/ViralLoad'));
const Retention = lazy(() => import('./retention/Retention'));
const Pbs = lazy(() => import('./pbs/Pbs'));
const Reports = lazy(() => import('./reports/Reports'));
const FacilityPage = lazy(() => import('./reports/FacilityPage'));
const Landing = lazy(() => import('./landing-page/Landing'))

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/landing" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboarding" component={Dashboarding} />
          <Route path="/hts" component={Hts} />
          <Route path="/tx_cur" component={Tx_cur} />
          <Route path="/viral_load" component={ViralLoad} />
          <Route path="/retention" component={Retention} />
          <Route path="/pbs" component={Pbs} />
          <Route path="/reports" component={Reports} />
          <Route path="/facility/:datimCode" component={FacilityPage} />
          <Redirect to="/landing" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
