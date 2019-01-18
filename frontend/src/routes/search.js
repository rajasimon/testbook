import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from './card';

class Search extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      user_id: props.user_id,
      token: props.token,
      email: props.email,
      isLoggedIn: props.isLoggedIn,
      companies: [],
      search: ''
    }

    this.handleResponse = this.handleResponse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchInputSubmit = this.handleSearchInputSubmit.bind(this)
  }

  componentDidMount() {
    // Also get the companies
    fetch('http://localhost:8000/get-companies/', {
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
    this.setState({
      companies: response
    })
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value
    })

    if (event.target.value === '') {
      this.handleSearchInputSubmit(event)
    }
  }

  handleSearchInputSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:8000/search-companies/', {
      method: "POST",
      body: JSON.stringify({
        search: this.state.search
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token,
      }
    })
      .then(res => res.json())
      .then(response => this.handleResponse(response))
  }

  render() {
    const listItems = this.state.companies.map((company) => <Card key={Math.random()} company={company} token={this.state.token} />)

    return (
      <div className="search-component">
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-three-quarters-desktop is-three-fifths-tablet">
                <form onSubmit={this.handleSearchInputSubmit}>
                  <div className="field">
                    <div className="control">              
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" placeholder="Search..." value={this.state.search} onChange={this.handleSearch} />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon="search" />
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
                <br></br>
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

export default Search;