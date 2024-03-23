import React from "react";
import { Link } from "react-router-dom";

const ItemSearchModal = ({ searchResults }) => {
  return (
    <div className="search-results-modal position-absolute top-100 start-0 w-100">
      <div className="bg-light rounded p-3 shadow">
        <h6 className="mb-2">Search Results</h6>
        {searchResults.length > 0 ? (
          <ul className="list-group">
            {searchResults.map((item) => (
              <li key={item.id} className="list-group-item">
                <Link to={`/item/${item.itemID}`}>{item.itemName}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No results found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default ItemSearchModal;
