import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navbar from './components/Navbar';
import Signin from './routes/signin';
import Signup from './routes/signup';
import Home from './routes/home';
import Search from './routes/search';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faHeart, faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faHeart, faUser, faEnvelope, faLock)


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar></Navbar>
          <section className="section">
            <div className="container">
              <Route exact path='/' component={Home} />
              <Route exact path='/signin' component={Signin} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/search' component={Search} />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
