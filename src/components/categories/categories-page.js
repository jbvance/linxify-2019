import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import requiresLogin from "../requires-login";
import Categories from "./categories";
import CategoryLinks from "./category-links";
import EditCategory from "../category-form/edit-category";
import AddCategory from "../category-form/add-category";

import { fetchUserCategories } from "../../actions/categories";

const CategoriesPage = ({ categories, fetchCategories, match }) => {
  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}/add`} component={AddCategory} />
        <Route exact path={`${match.path}`} component={Categories} />
        <Route
          exact
          path={`${match.path}/:categoryId`}
          component={CategoryLinks}
        />
        <Route
          exact
          path={`${match.path}/:categoryId/edit`}
          component={EditCategory}
        />
      </Switch>
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
