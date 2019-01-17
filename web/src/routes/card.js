import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    return (
      <div className="card-component">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{this.props.company.name}</p>
            <a className="card-header-icon">
              <span className="icon has-text-info">
                <FontAwesomeIcon icon="heart" />
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              { this.props.company.address }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;