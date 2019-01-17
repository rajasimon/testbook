import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="home-component">
        <section className="hero is-primary is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                TestCRM
              </h1>
              <h2 className="subtitle">
                A minimal personal CRM.
              </h2>
              <button className="button is-primary is-inverted">GETTING STARTED</button>
            </div>
          </div>
        </section>
      </div>     
    )
  }
}

export default Home;