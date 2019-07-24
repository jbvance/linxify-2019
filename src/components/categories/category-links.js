import React, { useState } from "react";
import { connect } from "react-redux";

import { deleteLink } from "../../actions/links.js";
import { openConfirmModal } from "../../actions/ui";
import ConfirmationModal from "../confirmation-modal";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import LinkRow from "../link-row/link-row";

const CategoryLinks = ({
  categories,
  deleteLink,
  links,
  match,
  openConfirmDelete,
  loading,
  ui,
  testState
}) => {
  const [idToDelete, setIdToDelete] = useState("");

  const onDeleteLink = id => {
    setIdToDelete(id);
    openConfirmDelete("confirm-delete-link");
  };

  const confirmDelete = () => {
    console.log("GOT TO DELETE");
    deleteLink(idToDelete);
    setIdToDelete("");
  };

  const getLinksByCategoryId = (catId, links) => {
    // Have to inclue "link.category" in filter method below b/c when a link
    // is edited, the API returns "catgegory" as the category id rathern than category._id
    const filtered = links.filter(
      link => link.category._id === catId || link.category === catId
    );
    return filtered.map(link => {
      //console.log(link.category._id);
      return <LinkRow key={link._id} link={link} deleteLink={onDeleteLink} />;
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const getCategoryNameById = id => {
    if (!categories) return "UNKNOWN CATEGORY";
    const category = categories.find(cat => cat._id === id);
    return category ? category.name : "Unknown Category";
  };

  const linksByCategory = getLinksByCategoryId(match.params.categoryId, links);

  return (
    <div>
      <h2>{getCategoryNameById(match.params.categoryId)}</h2>
      {linksByCategory}
      <ConfirmationModal
        modalKey="confirm-delete-link"
        confirmModalState={ui.confirmModalState}
        title="Confirm Delete"
        okCallback={() => confirmDelete()}
        cancelCallback={() => setIdToDelete("")}
      >
        Are you sure you want to delete this link?
      </ConfirmationModal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteLink: id => dispatch(deleteLink(id)),
  openConfirmDelete: modalKey => dispatch(openConfirmModal({ modalKey }))
});

const mapStateToProps = state => ({
  categories: state.categories.categories,
  links: state.userLinks.links,
  ui: state.ui,
  testState: state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryLinks);
