import React from "react";
import "./search-bar.css";

const SearchBar = ({ onChange }) => {
  return (
    <section className="container search-container">
      <div className="search-bar">
        <input
          type="text"
          className="browser-default search-textbox"
          placeholder="Search"
          onChange={event => onChange(event.target.value)}
        />
      </div>
    </section>
  );
};

export default SearchBar;
