import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScreenContextProvider from './contexts/ScreenContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import NavbarComponent from './components/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ScreenContextProvider>
      <NavbarComponent />
      <Router>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/login' component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path='/app' component={App} />
        </Switch>
      </Router>
      
    </ScreenContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

