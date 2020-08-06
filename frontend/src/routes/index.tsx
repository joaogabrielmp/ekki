import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Beneficiaries from '../pages/Beneficiaries';
import New from '../pages/Beneficiaries/New';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <Route path="/beneficiaries" exact component={Beneficiaries} />
    <Route path="/beneficiaries/new" component={New} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
