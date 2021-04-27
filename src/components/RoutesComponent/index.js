import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CountryCovidStatus from '../countryCovidStatus';
import StateCovidStatus from '../stateCovidStatus';

function Index() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={CountryCovidStatus} />
        <Route path='/state/:stateCode' component={StateCovidStatus} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default Index;
