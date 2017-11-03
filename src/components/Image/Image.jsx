import React from 'react';
import PropTypes from 'prop-types';
import 'components/Image/Image.scss';


const Image = ({ id, votes, onVote, url }) => (
  <div className="Image-wrapper">
    <img alt="" src={url} className="Image" />
    <div className="Image-content">
      <button className="Image-button" onClick={() => onVote(id, false)}>-</button>
      <span className="Image-count">{votes}</span>
      <button className="Image-button" onClick={() => onVote(id, true)}>+</button>
    </div>
  </div>
);

Image.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default Image;
