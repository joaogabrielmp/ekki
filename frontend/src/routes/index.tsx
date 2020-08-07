import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Beneficiaries from '../pages/Beneficiaries';
import NewBeneficiary from '../pages/Beneficiaries/NewBeneficiary';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <ProtectedRoute path="/beneficiaries" exact component={Beneficiaries} />
    <ProtectedRoute path="/beneficiaries/new" component={NewBeneficiary} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
