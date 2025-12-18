import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HelpPage from './pages/HelpPage';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/help" component={HelpPage} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
};

export default Routes;
