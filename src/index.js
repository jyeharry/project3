import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import Home from './components/Home';
import Stock from './components/Stock';

const Routes = (
  <Router>
    <Route exact path='/' component={Home} />
    <Route exact path='/stock' component={Stock} />
  </Router>
);

ReactDOM.render(Routes, document.getElementById('root'));
