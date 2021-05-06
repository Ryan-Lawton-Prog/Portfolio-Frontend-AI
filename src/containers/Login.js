import React from "react";
//import axios from 'axios';
import "./Login.css";
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        errorMessage: false,
        username: '',
        password: '',
        validForm: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    console.log(event);
    const url = "/login";
    const postBody = {
      username: this.state.username,
      password: this.state.password
    };
    const requestMetadata = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postBody)
    } // FLASK NEEDS TO BE CHANGED TO SUPPORT JSON DATA INSTEAD OF FORM DATA
    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          localStorage.setItem('user', result.token);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
    if (this.state.username && this.state.username.length > 0 && 
        this.state.password && this.state.password.length > 0){
        this.setState({validForm: true});
    }else{
        this.setState({validForm: false});
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username
              <input
                autoFocus
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>Password
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={!this.state.validForm}>
            Login
          </button>
          
          <button className="btn btn-primary btn-block" type="button" onClick={() => this.props.history.push('/createAccount')}>
            Create Account
          </button>
        </form>
      </div>
    );
  }
}


export default withRouter(Login)