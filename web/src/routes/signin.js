import React, { Component } from 'react';

class Signin extends Component {
  render() {
    return (
      <div class="signin-component">
        <div class="columns is-mobile is-centered">
          <div class="column is-half">
            <div class="field">
              <label class="label">Username</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input is-success" type="text" placeholder="Text input" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
              <p class="help is-success">This username is available</p>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="text" placeholder="Text input" /> 
              </div>
            </div>

            <button class="button is-primary">Submit</button>
          </div>
        </div>
      </div>   
    )
  }
}

export default Signin;