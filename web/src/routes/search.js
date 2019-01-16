import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from './card';

class Search extends Component {
  constructor(props) {
    super() 

    this.state = {
      token: '',
      email: ''
    }
  }
  componentDidMount() {
    if (localStorage.hasOwnProperty('token')) {
      this.setState({
        token: localStorage.token,
        email: localStorage.email
      })

      // Also get the companies
      fetch('http://localhost:8000/companies/', {
        method: "GET",
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => console.log(res))
        // .then(response => console.log(response))
    } else {
      this.props.history.push('/')
    }
  }
  render() {
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
              <Card></Card>
              <Card></Card>
            </div>
          </div>
        </div>
      </div>     
    )
  }
}

export default Search;