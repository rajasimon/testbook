import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      isLoggedIn: props.isLoggedIn
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    console.log(this)
  }

  handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('user_id')

    this.props.history.replace('/')

    this.setState({isLoggedIn: false})
  }

  render () {
    let postLoginSearchButton;
    let postLoginFavouritesButton;
    let postLoginProfileButton;
    let postLoginLogoutButton;

    let preLoginJoinButton;
    let preLogintLoginButton;

    if (this.state.isLoggedIn) {
      postLoginSearchButton = <Link className="navbar-item" to="/search">Search</Link>
      postLoginFavouritesButton = <Link className="navbar-item" to="/favourites">Favourites</Link>
      postLoginProfileButton = <Link className="button is-primary" to="/profile">Profile</Link>
      postLoginLogoutButton  = <button className="button is-light" onClick={this.handleLogout}>Logout</button>

    } else {
      preLoginJoinButton = <Link className="button is-primary" to="/signup"><strong>JOIN</strong></Link>
      preLogintLoginButton = <Link className="button is-light" to="/signin">Log in</Link>
    }
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
              { postLoginSearchButton }
              { postLoginFavouritesButton}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  { preLoginJoinButton }
                  { preLogintLoginButton }
                  { postLoginProfileButton }
                  { postLoginLogoutButton }
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