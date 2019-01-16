import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errorUsername: '',
      errrorEmail: '',
      errorPassword: ''
    }

    this.handleUsername = this.handleUsername.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleErrors = this.handleErrors.bind(this)
  }

  handleUsername(event) {
    this.setState({username: event.target.value})

    // Also clear any previous username related error
    this.setState({errorUsername: ''})
  }

  handleEmail(event) {
    this.setState({email: event.target.value})

    // Also clear any previous email related error
    this.setState({errorEmail: ''})
  }

  handlePassword(event) {
    this.setState({password: event.target.value})

    // Also clear any previous password related error
    this.setState({errorPassword: ''})
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:8000/users/', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => this.handleResonse(response))
  }

  handleResonse(response) {
    // Checking 'url' here to assume the request is success and proceed
    if (response.hasOwnProperty('url')) {
      console.log('This response is success please redirect to home')
      this.props.history.push('/signin')
    } else {
      this.handleErrors(response)
    }
  }

  handleErrors(errorResponse) {
    if (errorResponse.hasOwnProperty('username')) {
      this.setState({errorUsername: errorResponse.username})
    } else if (errorResponse.hasOwnProperty('email')) {
      this.setState({errrorEmail: errorResponse.email})
    } else if (errorResponse.hasOwnProperty('password')) {
      this.setState({errorPassword: errorResponse.password})
    } 
  }

  render() {
    return (
      <div className="signup-component">
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" placeholder="Raja Simon" value={this.state.username} onChange={this.handleUsername} />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="user" />
                  </span>
                </div>
                <p className={this.state.errorUsername ? 'help is-danger' : 'help'}>
                  {this.state.errorUsername ? this.state.errorUsername : ''}
                </p>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="email" placeholder="rajasimon@icloud.com"  value={this.state.email} onChange={this.handleEmail} />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="envelope" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className={this.state.errorEmail ? 'help is-danger' : 'help'}>
                  {this.state.errorEmail ? this.state.errorEmail : ''}
                </p>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" placeholder="xxxxxx" value={this.state.password} onChange={this.handlePassword} />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="lock" />
                  </span>
                </div>
                <p className={this.state.errorPassword ? 'help is-danger' : 'help'}>
                  {this.state.errorPassword ? this.state.errorPassword : ''}
                </p>
              </div>

              <button className="button is-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>   
    )
  }
}

export default Signup;