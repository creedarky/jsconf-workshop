import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container.jsx';
import 'components/Main/Main.scss';

function Main({ children }) {
  return (
    <main className="Main">
      <Container>
        {children}
      </Container>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};

Main.defaultProps = {
  children: null,
};

export default Main;
