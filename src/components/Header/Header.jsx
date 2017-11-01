import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from 'components/Container/Container.jsx';
import { IconButton } from 'material-ui';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import { white } from 'material-ui/styles/colors';
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
        <NavLink
          exact
          to="/sign-in"
          className="Header-navigation-item"
          activeClassName="Header-navigation-item--isActive"
        >
          Sign in
        </NavLink>
        }
        {!isLoggedIn &&
        <NavLink
          exact
          to="/sign-up"
          className="Header-navigation-item"
          activeClassName="Header-navigation-item--isActive"
        >
          Sign up
        </NavLink>
        }
        {isLoggedIn &&
        <NavLink
          exact
          to="/images"
          className="Header-navigation-item"
          activeClassName="Header-navigation-item--isActive"
        >
          Jogs
        </NavLink>
        }
        {isLoggedIn && <IconButton tooltip="Log out" onClick={onLogout} tooltipPosition="top-center"><ExitIcon color={white} /></IconButton>}
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
