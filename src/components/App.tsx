import '../css/App.css';
import React from 'react';

import {HashRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import Home from './Home';
import Stock from './Stock';

function App() {
  return (
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/stock/:symbol' component={Stock} />
      </Router>
  );
}

export default App;
