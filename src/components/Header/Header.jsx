import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from 'components/Container/Container.jsx';
import 'components/Header/Header.scss';


const Header = ({ isLoggedIn, onLogout }) => (
  <div className="Header">
    <Container>
      <h1 className="Header-title">JSConf Cat App</h1>
      <nav className="Header-navigation">
        <NavLink
          exact
          to="/"
          className="Header-navigation-item"
          activeClassName="Header-navigation-item--isActive"
        >
          Home
        </NavLink>
        {!isLoggedIn &&
          [
            <NavLink
              key={1}
              exact
              to="/sign-in"
              className="Header-navigation-item"
              activeClassName="Header-navigation-item--isActive"
            >
              Sign in
            </NavLink>,
            <NavLink
              key={2}
              exact
              to="/sign-up"
              className="Header-navigation-item"
              activeClassName="Header-navigation-item--isActive"
            >
              Sign up
            </NavLink>,
          ]
        }
        {isLoggedIn &&
          [
            <NavLink
              key={1}
              exact
              to="/images"
              className="Header-navigation-item"
              activeClassName="Header-navigation-item--isActive"
            >
              Images
            </NavLink>,
            <NavLink
              key={2}
              exact
              to="/add"
              className="Header-navigation-item"
              activeClassName="Header-navigation-item--isActive"
            >
              Add
            </NavLink>,
            <button key={3} onClick={onLogout}>Logout</button>,
          ]
        }
      </nav>
    </Container>
  </div>
);

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
