import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import { fetchUserLinks, addLinkFromAddressBar } from "../actions/links";
import { fetchUserCategories } from "../actions/categories";
import LandingPage from "./landing-page";
import Dashboard from "./dashboard";
import NoMatch from "./no-match";
import UserLinksPage from "../components/user-links/user-links-page";
import CategoriesPage from "../components/categories/categories-page";
import RegistrationPage from "./registration-page";
import Toolbar from "./toolbar";
import { refreshAuthToken } from "../actions/auth";

export class App extends React.Component {
  async componentDidUpdate(prevProps) {
    const { linkToSave } = this.props;
    if (!prevProps.loggedIn && this.props.loggedIn) {
      console.log("LINK TO SAVE", linkToSave);
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
      if (linkToSave && linkToSave.url) {
        await this.props.saveExternalLink({
          url: linkToSave.url,
          category: linkToSave.category
        });
      }
      this.props.fetchLinks();
      this.props.fetchCategories();
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
        <Toolbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route path="/links" component={UserLinksPage} />
          <Route path="/categories" component={CategoriesPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchUserCategories()),
  fetchLinks: () => dispatch(fetchUserLinks()),
  saveExternalLink: link => dispatch(addLinkFromAddressBar(link))
});

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  authToken: state.auth.authToken,
  linkToSave: state.userLinks.linkToSave
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
