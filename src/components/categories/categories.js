import React from "react";
import { connect } from "react-redux";

// deleteUserCategory (id, name) {
//   if (!window.confirm(`Delete category "${name}"?`)) return;  
//   this.props.dispatch(deleteCategory(id));        
                                                                                            
// }

const listCategories = catList => {
  return catList.map(category => {
    return (
      <div className="link-row" key={category._id}>
        <div className="url-text">{category.name}</div>
        <div className="link-row__button-row">
          <button className="btn btn-primary link-row__button">Edit</button>
          <button className="btn btn-primary link-row__button">Delete</button>
        </div>
      </div>
    );
  });
};

const Categories = ({ categories, fetchCategories, loading }) => {
  return loading ? (
    <h1>...Loading</h1>
  ) : (
    <div>
      <h2>Categories</h2>
      {listCategories(categories)}
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
  loading: state.categories.loading
});

export default connect(mapStateToProps)(Categories);
