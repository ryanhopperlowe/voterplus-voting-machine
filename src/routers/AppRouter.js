import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import Header from '../components/Header';
import VotePage from '../pages/VotePage/VotePage';

const AppRouter = () => (
  <BrowserRouter basename="/">
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route path="/vote" component={VotePage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;