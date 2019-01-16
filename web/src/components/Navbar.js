import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render () {
    return (
      <div className="navbar-component">
        <nav className="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h1 className="title">TestCRM</h1>
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <Link className="navbar-item" to="/search">
                Search
              </Link>
              <Link className="navbar-item" to="/favourites">
                Favourites
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-primary" to="/signup">
                    <strong>JOIN</strong>
                  </Link>
                  <Link className="button is-light" to="/signin">
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