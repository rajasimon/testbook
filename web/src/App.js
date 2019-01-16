import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navbar from './components/Navbar';
import Signin from './routes/signin';
import Signup from './routes/signup';
import Home from './routes/home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar></Navbar>
          <section class="section">
            <div class="container">
              <Route exact path='/' component={Home} />
              <Route exact path='/signin' component={Signin} />
              <Route exact path='/signup' component={Signup} />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
