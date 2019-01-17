import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      errorUsername: '',
      errorPassword: '',
      errorMessage: '',
      isLoggedIn: props.isLoggedIn,
    }

    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsername(event) {
    this.setState({username: event.target.value})

    // Also clear any previous username related error
    this.setState({errorUsername: '', errorMessage: ''})
  }

  handlePassword(event) {
    this.setState({password: event.target.value})

    // Also clear any previous password related error
    this.setState({errorPassword: '', errorMessage: ''})
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:8000/api-token-auth/', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => this.handleResponse(response))
  }

  handleResponse(response) {
    // Check the token present in the response
    if (response.hasOwnProperty('token')) {
      localStorage.setItem('user_id', response.user_id)
      localStorage.setItem('token', response.token)
      localStorage.setItem('email', response.email)
      
      // Redirect to main page.
      this.props.history.go(0)
      this.props.history.push('/')

    } else {
      this.handleErrors(response)
    }
  }

  handleErrors(errorResponse) {
    if (errorResponse.hasOwnProperty('username')) {
      this.setState({errorUsername: errorResponse.username})
    } 
    
    if (errorResponse.hasOwnProperty('password')) {
      this.setState({errorPassword: errorResponse.password})
    } 
    if (errorResponse.hasOwnProperty('non_field_errors')) {
      this.setState({errorMessage: errorResponse.non_field_errors})
    }
  }
  
  render() {
    return (
      <div className="signin-component">
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" placeholder="rajasimon" value={this.state.username} onChange={this.handleUsername} />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="user" />
                  </span>
                </div>
                <p className={this.state.errorUsername ? 'help is-danger' : 'help'}>
                  {this.state.errorUsername ? this.state.errorUsername : ''}
                </p>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <input className="input" type="password" placeholder="xxxxxx" value={this.state.password} onChange={this.handlePassword}  /> 
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="lock" />
                  </span>
                </div>
                <p className={this.state.errorPassword ? 'help is-danger' : 'help'}>
                  {this.state.errorPassword ? this.state.errorPassword : ''}
                </p>
              </div>
              <p className={this.state.errorMessage ? 'help is-danger' : 'help'}>
                {this.state.errorMessage ? this.state.errorMessage : ''}
              </p>
              <button className="button is-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>   
    )
  }
}

export default Signin;