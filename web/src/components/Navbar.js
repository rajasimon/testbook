import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render () {
    return (
      <div class="navbar-component">
        <nav class="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
              <h1 className="title">TestCRM</h1>
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <Link class="navbar-item" to="/">
                Home
              </Link>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <Link class="button is-primary" to="/signup">
                    <strong>JOIN</strong>
                  </Link>
                  <Link class="button is-light" to="/signin">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;