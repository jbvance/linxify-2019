import React, { useState } from "react";
import { connect } from "react-redux";

import { deleteLink } from "../../actions/links.js";
import { openConfirmModal } from "../../actions/ui";

import LoadingSpinner from "../loading-spinner/loading-spinner";
import LinkRow from "../link-row/link-row";
import ConfirmationModal from "../confirmation-modal";

import "./user-links.css";

const UserLinks = ({ links, deleteLink, loading, ui, openConfirmDelete }) => {
  const [idToDelete, setIdToDelete] = useState("");

  const onDeleteLink = id => {
    setIdToDelete(id);
    openConfirmDelete("confirm-delete-link");
  };

  const confirmDelete = () => {
    deleteLink(idToDelete);
    setIdToDelete("");
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <section className="container links-container">
      {!links || links.length === 0 ? (
        <div>No Links</div>
      ) : (
        links.map(link => (
          <LinkRow key={link._id} link={link} deleteLink={onDeleteLink} />
        ))
      )}
      <ConfirmationModal
        modalKey="confirm-delete-link"
        confirmModalState={ui.confirmModalState}
        title="Confirm Delete"
        okCallback={() => confirmDelete()}
        cancelCallback={() => setIdToDelete("")}
      >
        Are you sure you want to delete this link?
      </ConfirmationModal>
    </section>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteLink: id => dispatch(deleteLink(id)),
  openConfirmDelete: modalKey => dispatch(openConfirmModal({ modalKey }))
});

const mapStateToProps = state => ({
  loading: state.userLinks.loading,
  links: state.userLinks.links,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLinks);
