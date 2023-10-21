import React from "react";
import {FaSearch} from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  return (
    <div
      style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => onSearch(event.target.value)}
        style={{
          padding: "10px",
          width: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <FaSearch
        style={{
          position: "absolute",
          left: "665px",
          top: "7%",
          transform: "translateY(-50%)",
          color: "#b7b5b5", 
          pointerEvents: "none",
          fontSize: "19"
        }}
      />
    </div>
  );
};

export default SearchBar;
