import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      companies: []
    }

    this.handleRespone = this.handleRespone.bind(this)
  }

  componentDidMount() {
    console.log(this.state)
    console.log(this.props.location)
    
    // Also get the companies
    fetch('http://localhost:8000/companies/', {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => this.handleRespone(response))
  }

  handleRespone(response) {
    this.setState({
      companies: response
    })
  }

  render() {
    const listItems = this.state.companies.map((company) => <Card company={company} />)

    return (
      <div className="search-component">
        <div className="columns is-mobile is-centered">
          <div className="column is-three-quarters-desktop is-three-fifths-tablet">
            <div className="field">
              <div className="control">              
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Search..." />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon="search" />
                    </span>
                  </div>
              </div>
            </div>

            <div>
              { listItems }
            </div>
          </div>
        </div>
      </div>     
    )
  }
}

export default Search;