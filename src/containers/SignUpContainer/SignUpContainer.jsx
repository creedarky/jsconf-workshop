import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initCreateAccount } from 'actions/user.js';
import SignUpForm from 'components/SignUpForm/SignUpForm.jsx';

class SignUpContainer extends Component {
  render() {
    return (
      <SignUpForm onSubmit={this.props.initCreateAccount} />
    );
  }
}

SignUpContainer.propTypes = {
  initCreateAccount: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initCreateAccount }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUpContainer);
