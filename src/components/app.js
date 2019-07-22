import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import { fetchUserLinks } from "../actions/links";
import { fetchUserCategories } from "../actions/categories";

import Header from "./header-bar";
import LandingPage from "./landing-page";
import Dashboard from "./dashboard";
import EditLink from "../components/user-links/edit-link";
import CategoriesPage from "../components/categories/categories-page";
import RegistrationPage from "./registration-page";
import { refreshAuthToken } from "../actions/auth";

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      const { dispatch, authToken } = this.props;
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
      fetchUserLinks(dispatch, authToken);
      fetchUserCategories();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/links/edit/:linkId" component={EditLink} />
        <Route path="/categories" component={CategoriesPage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  authToken: state.auth.authToken
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
