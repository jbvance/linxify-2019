import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearAuth } from "../actions/auth";
import { clearAuthToken } from "../local-storage";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";

export const Toolbar = ({ dispatch, loggedIn }) => {
  const [state, setState] = React.useState({
    left: false
  });

  const logOut = () => {
    dispatch(clearAuth());
    clearAuthToken();
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button>
          <Link to="/">Your Links</Link>
        </ListItem>
        <ListItem>
          <Link to="/links/add">Add Link</Link>
        </ListItem>
        <ListItem>
          <Link to="/categories">Categories</Link>
        </ListItem>
        <ListItem>
          <Link to="/categories/add">Add Category</Link>
        </ListItem>
        <ListItem>
          <a href="#" onClick={logOut}>
            Logout
          </a>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  if (loggedIn) {
    return (
      <nav>
        <div className="nav-wrapper top-nav">
          <Link to="/" className="brand-logo logo">
            Linxify
          </Link>

          <ul className="left menu-icon">
            <li onClick={toggleDrawer("left", true)}>
              <img src="/images/menu-icon.jpg" alt="menu" />
            </li>
          </ul>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/links">Your Links</Link>
            </li>
            <li>
              <Link to="/links/add">Add Link</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/categories/add">Add category</Link>
            </li>
            {loggedIn && (
              <li>
                <a href="#" onClick={logOut}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          {sideList("left")}
        </Drawer>
      </nav>
    );
  } else {
    return (
      <ul id="mobile-nav" className="right hide-on-med-and-down">
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );
  }
};

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Toolbar);
