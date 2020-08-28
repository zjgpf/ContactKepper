import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './contexts/contact/ContactState';

const App = ()=> {
  return (
    <ContactState>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </Switch>
      </BrowserRouter>
    </ContactState>
  );
}

export default App;
