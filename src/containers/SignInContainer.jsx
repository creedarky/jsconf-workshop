import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initSignIn } from 'actions/user.js';
import SignInForm from 'components/SignInForm/SignInForm.jsx';

class SignInContainer extends Component {
  render() {
    return (
      <SignInForm onSubmit={this.props.initSignIn} />
    );
  }
}

SignInContainer.propTypes = {
  initSignIn: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initSignIn }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignInContainer);
