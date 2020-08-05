import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Beneficiaries from '../pages/Beneficiaries';
import Delete from '../pages/Beneficiaries/Delete';
import New from '../pages/Beneficiaries/New';
import Transfer from '../pages/Beneficiaries/Transfer';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <Route path="/beneficiaries" exact component={Beneficiaries} />
    <Route path="/beneficiaries/delete" component={Delete} />
    <Route path="/beneficiaries/new" component={New} />
    <Route path="/beneficiaries/transfer" component={Transfer} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
