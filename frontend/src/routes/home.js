import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="home-component">
        <section className="hero is-primary is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">
                TestCRM
              </h1>
              <h2 className="subtitle">
                A minimal personal CRM.
              </h2>
              <button className="button is-primary is-inverted">GETTING STARTED</button>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile">
              <div className="column">
                <header className="header">
                  <h4 className="title has-text-primary has-text-centered">Beautiful Interface</h4>
                  <figure className="image is-2by1">
                    <img src="" />
                  </figure>
                </header>
              </div>
              <div className="column">
                <header className="header">
                  <h4 className="title has-text-primary has-text-centered">Beautiful Interface</h4>
                  <figure className="image is-2by1">
                    <img src="" />
                  </figure>
                </header>
              </div>
              <div className="column">
                <header className="header">
                  <h4 className="title has-text-primary has-text-centered">Beautiful Interface</h4>
                  <figure className="image is-2by1">
                    <img src="" />
                  </figure>
                </header>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              TestCRM Made with love in Chennai by <a href="https://twitter.com/rajasimon">Rajasimon</a>
            </p>
          </div>
        </footer>
      </div>     
    )
  }
}

export default Home;