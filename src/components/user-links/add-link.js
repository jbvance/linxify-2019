import React, { useEffect } from "react";
import { connect } from "react-redux";
//import { toast } from 'react-toastify';
import requiresLogin from "../requires-login";
import { addLink } from "../../actions/links";
import { fetchUserCategories } from "../../actions/categories";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import LinkForm from "../link-form";

const AddLink = ({
  dispatch,
  error,
  history,
  linksLoading,
  categoriesLoading
}) => {
  useEffect(() => {
    dispatch(fetchUserCategories());
    //console.log(match, history, ...otherProps);
  }, []);

  const submitLink = (url, category, title, note) => {
    dispatch(
      addLink({
        url,
        category,
        title,
        note
      })
    ).then(() => {
      if (!error) {
        //toast.success('Link saved successfully!', {
        //position: toast.POSITION.TOP_CENTER
        //});
        history.push("/links");
      }
    });
  };

  if (linksLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <h3 className="link-header">Add Link</h3>
      {error && (
        <div className="container alert-alert-danger">{error.message}</div>
      )}
      <LinkForm
        onSubmitLink={(url, category, title, note) =>
          submitLink(url, category, title, note)
        }
      />
    </div>
  );
};

const mapStateToProps = state => ({
  linksLoading: state.userLinks.loading,
  error: state.userLinks.error,
  categoriesLoading: state.categories.loading
});

export default requiresLogin()(connect(mapStateToProps)(AddLink));
