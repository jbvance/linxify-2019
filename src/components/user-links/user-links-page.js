import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import requiresLogin from "../requires-login";
import UserLinks from "./user-links";
import EditLink from "./edit-link";
import AddLink from "./add-link";

import { fetchUserLinks } from "../../actions/links";

const UserLinksPage = ({ links, fetchLinks, match }) => {
  useEffect(() => {
    if (!links || links.length === 0) {
      fetchLinks();
    }
  }, []);

  return (
    <Switch>
      <Route exact path={`${match.path}/add`} component={AddLink} />
      <Route exact path={`${match.path}/edit/:linkId`} component={EditLink} />
      <Route exact path={match.path} component={UserLinks} />
    </Switch>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchLinks: () => dispatch(fetchUserLinks())
});

const mapStateToProps = state => ({
  categories: state.categories.categories
});

export default requiresLogin()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserLinksPage)
);
