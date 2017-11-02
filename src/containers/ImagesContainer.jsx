import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { vote, loadImages } from 'actions/images.js';
import Image from 'components/Image/Image.jsx';

class ImagesContainer extends Component {
  componentDidMount() {
    this.props.loadImages();
  }

  render() {
    const { images, onVote } = this.props;
    if (!images || !images.length) {
      return <div>Loading...</div>;
    }

    return (
      <div className="ImagesContainer">
        {images.map(i => (
          <Image key={i.id} id={i.id} url={i.url} onVote={onVote} votes={i.voteCount} />
        ))}

      </div>
    );
  }
}

ImagesContainer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onVote: PropTypes.func.isRequired,
  loadImages: PropTypes.func.isRequired,
};

function mapStateToProps({ images }) {
  return {
    images,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ onVote: vote, loadImages }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImagesContainer));
