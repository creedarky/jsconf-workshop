import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, TextField, Paper } from 'material-ui';
import './SignInForm.scss';

const styles = {
  paper: {
    display: 'inline-block',
    padding: '2rem',
  },
  text: {
    display: 'block',
  },
};

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
        <Paper zDepth={2} style={styles.paper}>
          <TextField
            className="SignInForm__text"
            floatingLabelFixed
            floatingLabelText="Email"
            name="email"
            onChange={this.onChangeEmail}
            style={styles.text}
            type="email"
            value={email}
          />
          <TextField
            className="SignInForm__text"
            floatingLabelFixed
            floatingLabelText="Password"
            name="password"
            onChange={this.onChangePassword}
            style={styles.text}
            type="password"
            value={password}
          />
          <RaisedButton primary onClick={this.onSubmit}>Submit</RaisedButton>
        </Paper>
      </div>
    );
  }
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
