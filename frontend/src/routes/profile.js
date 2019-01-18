import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: props.isLoggedIn,
      user_id: props.user_id,
      email: props.email,
      token:  props.token,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      successResponse: '',
      errorOldPassword: '',
      errorNewPassword: '',
      errorConfirmPassword: ''
    }

    this.handleOldPassword = this.handleOldPassword.bind(this)
    this.handleNewPassword = this.handleNewPassword.bind(this)
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
    this.handleSuccessResponse = this.handleSuccessResponse.bind(this)
    this.handleFailedResponse = this.handleFailedResponse.bind(this)
  }

  componentDidMount() {
    console.log(this.state)
  }

  handleOldPassword(event) {
    this.setState({
      oldPassword: event.target.value,
      errorOldPassword: '',
      successResponse: ''
    })
  }

  handleNewPassword(event) {
    this.setState({
      newPassword: event.target.value,
      errorNewPassword: ''
    })
  }

  handleConfirmPassword(event) {
    this.setState({
      confirmPassword: event.target.value,
      errorConfirmPassword: ''
    })
  }

  handlePasswordSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:8000/users/' + this.state.user_id + '/set_password/', {
      method: 'POST',
      body: JSON.stringify({
        old_password: this.state.oldPassword,
        new_password: this.state.newPassword,
        confirm_password: this.state.confirmPassword
      }),
      headers:{
        'Authorization': 'Token ' + this.state.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => this.handleResponse(response))
  }

  handleResponse(response) {
    console.log(response)
    if (response.hasOwnProperty('status')) {
      this.handleSuccessResponse(response)
    } else {
      this.handleFailedResponse(response)
    }
  }

  handleSuccessResponse(response) {
    this.setState({
      successResponse: response.status,
      oldPassword: '',
      newPassword: '',
      confirmPasword: '',
      errorOldPassword: '',
      errorNewPassword: '',
      errorConfirmPassword: ''
    })
  }

  handleFailedResponse(response) {
    if (response.hasOwnProperty('old_password')) {
      this.setState({errorOldPassword: response.old_password})
    }

    if (response.hasOwnProperty('new_password')) {
      this.setState({errorNewPassword: response.new_password})
    }

    if (response.hasOwnProperty('confirm_password')) {
      this.setState({errorConfirmPassword: response.cofirm_password})
    }
   }

  render() {
    return (
      <div className="profile-component">
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-half-desktop">
                <h1 className="title">RajaSimon</h1>
                <hr />
                <form onSubmit={this.handlePasswordSubmit}>
                  <div className="field">
                    <label className="label">Old Password</label>
                    <div className="control has-icons-left">
                      <input className="input" type="password" placeholder="Enter old password" value={this.state.oldPassword} onChange={this.handleOldPassword}  /> 
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="lock" />
                      </span>
                    </div>
                    <p className={this.state.errorOldPassword ? 'help is-danger' : 'help'}>
                      {this.state.errorOldPassword ? this.state.errorOldPassword : ''}
                    </p>
                  </div>
                  <hr />
                  <div className="field">
                    <label className="label">New Password</label>
                    <div className="control has-icons-left">
                      <input className="input" type="password" placeholder="Enter new password" value={this.state.newPassword} onChange={this.handleNewPassword}  /> 
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="lock" />
                      </span>
                    </div>
                    <p className={this.state.errorNewPassword ? 'help is-danger' : 'help'}>
                      {this.state.errorNewPassword ? this.state.errorNewPassword : ''}
                    </p>
                  </div>
                  <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control has-icons-left">
                      <input className="input" type="password" placeholder="Enter confirm password" value={this.state.confirmPassword} onChange={this.handleConfirmPassword}  /> 
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="lock" />
                      </span>
                    </div>
                    <p className={this.state.errorConfirmPassword ? 'help is-danger' : 'help'}>
                      {this.state.errorConfirmPassword ? this.state.errorConfirmPassword : ''}
                    </p>
                  </div>
                  <p className={this.state.successResponse ? 'help is-primary' : 'help'}>
                    {this.state.successResponse ? this.state.successResponse : ''}
                  </p>

                  <button className="button is-primary" type="submit">Change Password</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default Profile;