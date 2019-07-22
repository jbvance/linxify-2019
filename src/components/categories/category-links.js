import React from "react";
import { connect } from "react-redux";

const CategoryLinks = ({ categories, links, match }) => {
  const linksByCat = getLinksByCategoryId(match.params.categoryId, links);
  console.log("LINKSBYCAT", linksByCat);
  return <div>{match.params.categoryId}</div>;
};

const getLinksByCategoryId = (catId, links) => {
  return links.filter(link => {
    //console.log(link.category._id);
    return link.category._id === catId;
  });
};

const mapStateToProps = state => ({
  categories: state.categories.catgories,
  links: state.userLinks.links
});

export default connect(mapStateToProps)(CategoryLinks);
