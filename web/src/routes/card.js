import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends Component {
  render() {
    return (
      <div className="card-component">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Component</p>
            <a className="card-header-icon">
              <span className="icon">
                <FontAwesomeIcon icon="heart" />
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              Address here
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;