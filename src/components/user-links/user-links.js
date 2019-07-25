import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { deleteLink } from "../../actions/links.js";
import { openConfirmModal } from "../../actions/ui";

import LoadingSpinner from "../loading-spinner/loading-spinner";
import LinkRow from "../link-row/link-row";
import ConfirmationModal from "../confirmation-modal";
import SearchBar from "../search-bar/search-bar";

import { filterLinks } from "../../utils/links.utils";

import "./user-links.css";

const UserLinks = ({ links, deleteLink, loading, ui, openConfirmDelete }) => {
  const [idToDelete, setIdToDelete] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    setFilteredLinks(links);
  }, [links]);

  const onDeleteLink = id => {
    setIdToDelete(id);
    openConfirmDelete("confirm-delete-link");
  };

  const confirmDelete = () => {
    deleteLink(idToDelete);
    setIdToDelete("");
  };

  const onSearchChange = value => {
    const filtered = filterLinks(links, value);
    setFilteredLinks(filtered);
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <SearchBar onChange={onSearchChange} />
      <section className="container links-container">
        {!filteredLinks || filteredLinks.length === 0 ? (
          <h3>No Links</h3>
        ) : (
          filteredLinks.map(link => (
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
    </div>
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
