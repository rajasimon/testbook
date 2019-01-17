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
      companies: [],
      startCount: 1,
      endCount: 1,      
      startCountLink: '',
      endCountLink: '',
      nextLink: 1,
      previousLink: 1
    }

    this.handleLink = this.handleLink.bind(this)
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

  handleLink(event) {
    event.preventDefault()

    console.log(this.props.location)

    const urlParams = new URLSearchParams(event.target.href)
    const page = urlParams.get('page')
    console.log(page)
    
    // Also get the companies
    fetch('http://localhost:8000/companies/?page=' + page, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => this.handleRespone(response))

  }

  handleRespone(response) {
    
    const urlParams = new URLSearchParams(this.props.location.search)
    const page = urlParams.get('page')
    
    if (page === null) {
      page = 1
    }
    
    const startCount = 1
    const endCount = response.count
    const startCountLink = '/search?page=' + 1
    const endCountLink = '/search?page=' + endCount

    const nextLink = '/search?page=' + page + 1
    const previousLink = '/search?page=' + page - 1

    this.setState({
      startCount: startCount,
      endCount: endCount,
      startCountLink: startCountLink,
      endCountLink: endCountLink,
      nextLink: nextLink,
      previousLink: previousLink,
      companies: response.results
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

            <div className="search-pagination">
              <nav className="pagination" role="navigation" aria-label="pagination">
                <a className="pagination-previous">Previous</a>
                <a className="pagination-next">Next page</a>
                <ul className="pagination-list">
                  <li>
                    <Link to={this.state.startCountLink} className="pagination-link" aria-label="Goto page 1">{this.state.startCount}</Link>
                  </li>
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                  <li>
                    <a onClick={this.handleLink} data-endCount={this.state.endCount} className="pagination-link" aria-label="Goto page 45">{this.state.endCount}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>     
    )
  }
}

export default Search;