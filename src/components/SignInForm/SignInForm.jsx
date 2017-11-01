import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignInForm.scss';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit() {
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ email, password });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="SignInForm">
        <input
          className="SignInForm__text"
          name="email"
          onChange={this.onChangeEmail}
          type="email"
          value={email}
        />
        <input
          className="SignInForm__text"
          name="password"
          onChange={this.onChangePassword}
          type="password"
          value={password}
        />
        <button primary onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
