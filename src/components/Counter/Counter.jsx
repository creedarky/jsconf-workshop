import React from 'react';
import PropTypes from 'prop-types';
import 'components/Counter/Counter.scss';


const Counter = ({ count, increment, decrement }) => (
  <div className="Counter">
    <h2 className="Counter-title">Counter Component</h2>
    <div className="Counter-content">
      <button className="Counter-button" onClick={decrement}>-</button>
      <span className="Counter-count">{count}</span>
      <button className="Counter-button" onClick={increment}>+</button>
    </div>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
};

export default Counter;
