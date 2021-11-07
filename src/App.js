import './App.css';

import React from 'react';
import { Route} from 'react-router-dom';

import { Landing } from './components/landing/Landing';
import{ Home} from './components/homeP/Home';
import {Details} from './components/Details/Details'




function App() {
  return (
    <React.Fragment>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/details/:id' component={Details}/>
    </React.Fragment>      
  );
}

export default App;
