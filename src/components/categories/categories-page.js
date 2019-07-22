import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import requiresLogin from "../requires-login";
import Categories from "./categories";
import CategoryLinks from "./category-links";

import { fetchUserCategories } from "../../actions/categories";

const CategoriesPage = ({ categories, fetchCategories, match }) => {
  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return (
    <div className="container">
      <Route exact path={`${match.path}`} component={Categories} />
      <Route
        exact
        path={`${match.path}/:categoryId`}
        component={CategoryLinks}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchUserCategories())
});

const mapStateToProps = state => ({
  categories: state.categories.categories
});

export default requiresLogin()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoriesPage)
);
