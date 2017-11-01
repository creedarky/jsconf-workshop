import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement } from 'actions/count.js';
import Counter from 'components/Counter/Counter.jsx';

class CounterContainer extends Component {
  render() {
    return (
      <Counter
        count={this.props.count}
        increment={this.props.increment}
        decrement={this.props.decrement}
      />
    );
  }
}

CounterContainer.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
};

function mapStateToProps({ count }) {
  return {
    count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment, decrement }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
