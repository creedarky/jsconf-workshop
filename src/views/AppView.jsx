import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from 'components/Header/Header.jsx';
import Main from 'components/Main/Main.jsx';
import Footer from 'components/Footer/Footer.jsx';
import { signOut, autoLogin } from 'actions/user.js';
import routes from 'routes.js';

class App extends Component {

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.autoLogin();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error !== this.props.error) {
      NotificationManager.error(nextProps.error.message, 'Error', 10000);
    }
  }

  render() {
    const { isLoggedIn, onLogout } = this.props;
    return (
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <Main>
          { !isLoggedIn && <Route path="/:path(images|add)" render={() => (<Redirect to="/sign-in" />)} />}
          { isLoggedIn && <Route path="/:path(sign-in|sign-up)" render={() => (<Redirect to="/" />)} />}
          { routes.map(r => (
            <Route key={r.path} {...r} />
          ))}
        </Main>
        <Footer />
        <NotificationContainer />
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  autoLogin: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }),
};

App.defaultProps = {
  isLoggedIn: false,
  error: null,
};


function mapStateToProps({ user, errors }) {
  return {
    isLoggedIn: !!user,
    error: errors.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { onLogout: signOut, autoLogin },
    dispatch,
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

