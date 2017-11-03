/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const Html = ({ title, css, scripts, markup, initialState }) => (
  <html lang="en">
    <head>
      <title>{title}</title>
      <link type="text/css" rel="stylesheet" href={`/${css}`} />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`,
        }}
      />
      {scripts.map(s => <script key={s} type="text/javascript" src={`/${s}`} />)}
    </body>
  </html>
);

Html.propTypes = {
  title: PropTypes.string,
  css: PropTypes.string.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
  markup: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialState: PropTypes.object.isRequired,
};

Html.defaultProps = {
  title: 'Jsconf App',
};


export default Html;
