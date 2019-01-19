import React, { Component } from 'react';

import Card from './card';

class Favorite extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      user_id: props.user_id,
      token: props.token,
      email: props.email,
      isLoggedIn: props.isLoggedIn,
      companies: []
    }

    this.handleResponse = this.handleResponse.bind(this)
  }

  componentDidMount() {
    
    // Also get the companies
    fetch('http://localhost:8000/get-favorites/', {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token,
      }
    })
      .then(res => res.json())
      .then(response => this.handleResponse(response))
  }

  handleResponse(response) {
    console.log(response)
    this.setState({
      companies: response
    })
  }

  render() {
    const listItems = this.state.companies.map((company) => <Card key={Math.random()} company={company} token={this.state.token} />)

    return (
      <div className="search-component">
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-three-quarters-desktop is-three-fifths-tablet">
                <div>
                  { listItems }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>     
    )
  }
}

export default Favorite;