import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignUpForm.scss';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit() {
    const { email, password, name } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ email, name, password });
  }

  render() {
    const { email, name, password } = this.state;
    return (
      <div className="SignUpForm">
        <input
          className="SignUpForm__text"
          name="name"
          onChange={this.onChangeName}
          type="text"
          value={name}
        />
        <input
          className="SignUpForm__text"
          name="email"
          onChange={this.onChangeEmail}
          type="email"
          value={email}
        />
        <input
          className="SignUpForm__text"
          name="password"
          onChange={this.onChangePassword}
          type="password"
          value={password}
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
