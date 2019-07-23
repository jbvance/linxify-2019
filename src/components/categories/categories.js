import React from "react";
import { connect } from "react-redux";

import { deleteCategory } from "../../actions/categories";

const Categories = ({
  categories,
  loading,
  deleteCategory,
  error,
  match,
  history
}) => {
  const listCategories = catList => {
    return catList.map(category => {
      const { _id, name } = category;
      return (
        <div className="link-row" key={_id}>
          <div
            className="url-text"
            onClick={() => history.push(`${match.path}/${_id}`)}
          >
            {name}
          </div>
          <div className="link-row__button-row">
            <button className="btn btn-primary link-row__button">Edit</button>
            <button
              className="btn btn-primary link-row__button"
              onClick={() => deleteUserCategory(_id, name)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  const deleteUserCategory = (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    deleteCategory(id);
  };

  return loading ? (
    <h1>...Loading</h1>
  ) : (
    <div>
      {error && error.error && (
        <div className=" alert alert-danger">{error.error.message}</div>
      )}
      <h2>Categories</h2>
      {listCategories(categories)}
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
  loading: state.categories.loading,
  error: state.categories.error
});

const mapDispatchToProps = dispatch => ({
  deleteCategory: id => dispatch(deleteCategory(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
