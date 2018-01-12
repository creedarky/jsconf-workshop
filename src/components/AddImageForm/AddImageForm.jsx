import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddImageForm.scss';

class AddImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  onSubmit() {
    const { url } = this.state;
    const { onSubmit } = this.props;
    if (!url || !url.trim().length === 0) {
      // eslint-disable-next-line no-alert
      alert('You must provide an url');
      return;
    }
    onSubmit(url);
    this.setState({
      url: '',
    });
  }

  render() {
    const { url } = this.state;
    return (
      <div className="AddImageForm">
        <input
          className="input"
          name="url"
          onChange={this.onChange}
          type="text"
          required
          placeholder="Image URL"
          value={url}
        />
        <button className="button" onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

AddImageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddImageForm;
