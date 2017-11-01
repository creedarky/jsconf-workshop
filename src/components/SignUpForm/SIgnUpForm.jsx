import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, TextField, Paper } from 'material-ui';
import './SignUpForm.scss';

const styles = {
  paper: {
    display: 'inline-block',
    padding: '2rem',
  },
  text: {
    display: 'block',
  },
};

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
        <Paper zDepth={2} style={styles.paper}>
          <TextField
            className="SignUpForm__text"
            floatingLabelFixed
            floatingLabelText="Name"
            name="name"
            onChange={this.onChangeName}
            style={styles.text}
            type="text"
            value={name}
          />
          <TextField
            className="SignUpForm__text"
            floatingLabelFixed
            floatingLabelText="Email"
            name="email"
            onChange={this.onChangeEmail}
            style={styles.text}
            type="email"
            value={email}
          />
          <TextField
            className="SignUpForm__text"
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

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
