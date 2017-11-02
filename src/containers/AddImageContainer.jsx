import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addImage } from 'actions/images.js';
import AddImageForm from 'components/AddImageForm/AddImageForm.jsx';

class AddImageContainer extends Component {
  render() {
    return (
      <AddImageForm onSubmit={this.props.addImage} />
    );
  }
}

AddImageContainer.propTypes = {
  addImage: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addImage }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddImageContainer);
