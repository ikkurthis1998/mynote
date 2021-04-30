import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ScreenContextProvider from './contexts/ScreenContext';
import { Switch, Route, HashRouter} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import NavbarComponent from './components/NavbarComponent';
import ForgotPassword from './components/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './contexts/AuthContext';
import UpdateProfile from './components/UpdateProfile';
import EditorContextProvider from './contexts/EditorContext';

ReactDOM.render(
  <ScreenContextProvider>
    <AuthContextProvider>
      <EditorContextProvider>
        <HashRouter hashType={"noslash"}>
          <NavbarComponent />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </HashRouter>
      </EditorContextProvider>
    </AuthContextProvider>
  </ScreenContextProvider>,
  document.getElementById('root')
);

