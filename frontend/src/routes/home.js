import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import preferences from '../assets/preferences.png';
import collaboration from '../assets/collaboration.png';
import search from '../assets/search.png';
import wireframing from '../assets/wireframing.png'
import Signin from './signin';


class Home extends Component {
  render() {
    return (
      <div className="home-component">
        <section className="hero is-white is-small">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column">
                  <h1 className="title is-1">
                    Find Customer Faster
                  </h1>
                  <h2 className="subtitle">
                    Lead generation powered by Artifical Intelligence.
                  </h2>
                  <Link className="button is-primary is-medium" to="/signin">
                    GETTING STARTED
                  </Link>
                </div>
                <div className="column">
                  <figure className="image is-4by3">
                    <img src={preferences} />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="section">
          <div className="container">
            <div className="columns is-mobile">
              <div className="column">
                <header className="header">
                  <h4 className="title has-text-primary has-text-centered">Search Companies</h4>
                  <figure className="image is-2by1">
                    <img src={search} />
                  </figure>
                </header>
              </div>
              <div className="column">
                <header className="header">
                  <h4 className="title has-text-primary has-text-centered">Favorite Companies</h4>
                  <figure className="image is-2by1">
                    <img src={collaboration} />
                  </figure>
                </header>
              </div>
              <div className="column">
                <header className="header">
                  <h4 className="title has-text-primary has-text-centered">Beautiful Interface</h4>
                  <figure className="image is-2by1">
                    <img src={preferences} />
                  </figure>
                </header>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              Leadbook | Programming Challenge | Made with love in Chennai by <a href="https://twitter.com/rajasimon">Rajasimon</a>
            </p>
          </div>
        </footer>
      </div>     
    )
  }
}

export default Home;