import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.token,
      companyId: props.company.id,
      companyName: props.company.name,
      companyAddress: props.company.address,
      favorite: props.company.favorite,
    }
    
    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }

  handleFavorite() {
    let endpoint
    if (this.state.favorite === true) {
      endpoint = process.env.REACT_APP_BACKEND_URL +  '/delete-favorite/'
    } else {
      endpoint = process.env.REACT_APP_BACKEND_URL + '/set-favorite/'
    }

    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        id: this.state.companyId
      }),
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
    if (response.hasOwnProperty('favorite')) {
      this.setState({favorite: response.favorite})
    }
  }

  render() {
    return (
      <div className="card-component">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{this.state.companyName}</p>
            <a className="card-header-icon" onClick={this.handleFavorite} href="javascript: void(0);">
              <span className={this.state.favorite ? 'icon has-text-primary': "icon has-text-gray-light"}>
                <FontAwesomeIcon icon="heart" />
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              { this.state.companyAddress }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;