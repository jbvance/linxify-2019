import React from "react";
import { connect } from "react-redux";

import { deleteLink } from "../../actions/links.js";

import LoadingSpinner from "../loading-spinner/loading-spinner";
import LinkRow from "../link-row/link-row";

import "./user-links.css";

const UserLinks = ({ links, deleteLink, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <section className="container links-container">
      {!links || links.length === 0 ? (
        <div>No Links</div>
      ) : (
        links.map(link => (
          <LinkRow key={link._id} link={link} deleteLink={deleteLink} />
        ))
      )}
    </section>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteLink: id => dispatch(deleteLink(id))
});

const mapStateToProps = state => ({
  loading: state.userLinks.loading,
  links: state.userLinks.links
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLinks);
