import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ContactState from './contexts/contact/ContactState';
import AuthState from './contexts/auth/AuthState';
import AlertState from './contexts/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';

const App = ()=> {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
