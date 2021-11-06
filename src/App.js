import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import MainLayout from './MainLayout'

function App() {
  return (
    <Switch>
      <Redirect exact path="/" to="/lge2021/pr/muni/leading" />
      <Route path="/:election/:ballot/:level/:theme/:selected" component={MainLayout} />
      <Route path="/:election/:ballot/:level/:theme" component={MainLayout} />
    </Switch>
  );
}

export default App;
