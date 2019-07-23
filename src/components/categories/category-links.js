import React from "react";
import { connect } from "react-redux";

import LinkRow from "../link-row/link-row";

const CategoryLinks = ({ categories, links, match }) => {
  const linksByCategory = getLinksByCategoryId(match.params.categoryId, links);
  console.log("LINKS BY CAT", linksByCategory);
  return <div>{linksByCategory}</div>;
};

const getLinksByCategoryId = (catId, links) => {
  // Have to inclue "link.category" in filter method below b/c when a link
  // is edited, the API returns "catgegory" as the category id rathern than category._id
  const filtered = links.filter(
    link => link.category._id === catId || link.category === catId
  );
  return filtered.map(link => {
    //console.log(link.category._id);
    return <LinkRow key={link._id} link={link} />;
  });
};

const mapStateToProps = state => ({
  categories: state.categories.catgories,
  links: state.userLinks.links
});

export default connect(mapStateToProps)(CategoryLinks);
