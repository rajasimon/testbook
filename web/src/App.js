import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Signin from './routes/signin';
import Signup from './routes/signup';
import Profile from './routes/profile';
import Home from './routes/home';
import Search from './routes/search';
import Favorite from './routes/favorite';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faHeart, faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faHeart, faUser, faEnvelope, faLock)


class App extends Component {
  constructor(props) {
    super(props)

    const email = localStorage.getItem('email')
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')

    if (email){
      this.state = {
        isLoggedIn: true,
        email: email,
        token: token,
        user_id: user_id
      }
    } else {
      this.state = {isLoggedIn: false}
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route render={(props) => <Navbar {...props} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/' component={Home} />
          <section className="section">
            <div className="container">
              <Route exact path='/signin' render={(props) => <Signin {...props} isLoggedIn={this.state.isLoggedIn} />} />
              <Route exact path='/signup' render={(props) => <Signup {...props} isLoggedIn={this.state.isLoggedIn} />} />
              <Route exact path='/search' render={(props) => <Search {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id} email={this.state.email} token={this.state.token} />} />
              <Route exact path='/profile' render={(props) => <Profile {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id} email={this.state.email} token={this.state.token} />} />
              <Route exact path='/favorite' render={(props) => <Favorite {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id} email={this.state.email} token={this.state.token} />} />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
