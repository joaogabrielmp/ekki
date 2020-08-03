import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Beneficiaries from '../pages/Beneficiaries';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <Route path="/beneficiaries" component={Beneficiaries} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
