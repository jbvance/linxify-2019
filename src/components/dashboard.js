import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";

import requiresLogin from "./requires-login";
import { fetchUserLinks } from "../actions/links";
import UserLinks from "./user-links/user-links";

const Dashboard = ({ userLinks, fetchLinks }) => {
  useEffect(() => {
    if (!userLinks.links || userLinks.links.length < 1) {
      fetchLinks();
    }
  }, []);

  const { links } = userLinks;

  return (
    <Container>
      <UserLinks />
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchLinks: () => dispatch(fetchUserLinks())
});

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    userLinks: state.userLinks,
    authToken: state.auth.authToken
  };
};

export default requiresLogin()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
