import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeView from 'views/HomeView.jsx';
import SignInView from 'views/SignInView.jsx';
import SignUpView from 'views/SignUpView.jsx';
import Header from 'components/Header/Header.jsx';
import Main from 'components/Main/Main.jsx';
import Footer from 'components/Footer/Footer.jsx';
import { signOut, autoLogin } from 'actions/user.js';

class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
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
          <Route exact path="/" component={HomeView} />
          {!isLoggedIn && <Route exact path="/sign-in" component={SignInView} />}
          {!isLoggedIn && <Route exact path="/sign-up" component={SignUpView} />}
          {!isLoggedIn && (
            <Route path="/:path(report|users|jogs|jog-admin)" render={() => (<Redirect to="/sign-in" />)} />
          )}
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
    isLoggedIn: !!user.data,
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

