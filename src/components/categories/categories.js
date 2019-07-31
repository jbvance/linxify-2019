import React, { useState } from "react";
import { connect } from "react-redux";

import { openConfirmModal } from "../../actions/ui";
import ConfirmationModal from "../confirmation-modal";
import LoadingSpinner from "../loading-spinner/loading-spinner";

import { deleteCategory } from "../../actions/categories";
import { sortArrayByField } from "../../utils";

export const Categories = ({
  categories,
  deleteCategory,
  error,
  history,
  loading,
  match,
  openConfirmDelete,
  ui
}) => {
  const [idToDelete, setIdToDelete] = useState("");

  const onDeleteCategory = id => {
    setIdToDelete(id);
    openConfirmDelete("confirm-delete-category");
  };

  const confirmDelete = () => {
    deleteCategory(idToDelete);
    setIdToDelete("");
  };
  const listCategories = catList => {
    const sorted = sortArrayByField(catList, "name");

    return sorted.map(category => {
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
            <button
              className="btn btn-primary link-row__button"
              onClick={() => history.push(`${match.path}/${_id}/edit`)}
            >
              Edit
            </button>
            <button
              className="btn btn-primary link-row__button"
              onClick={() => onDeleteCategory(_id, name)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="container">
      {error && error.error && (
        <div className=" alert alert-danger">{error.error.message}</div>
      )}
      <h2>Categories</h2>
      {listCategories(categories)}
      <ConfirmationModal
        modalKey="confirm-delete-category"
        confirmModalState={ui.confirmModalState}
        title="Confirm Delete"
        okCallback={() => confirmDelete()}
        cancelCallback={() => setIdToDelete("")}
      >
        Are you sure you want to delete this category?
      </ConfirmationModal>
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
  loading: state.categories.loading,
  error: state.categories.error,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  deleteCategory: id => dispatch(deleteCategory(id)),
  openConfirmDelete: modalKey => dispatch(openConfirmModal({ modalKey }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
