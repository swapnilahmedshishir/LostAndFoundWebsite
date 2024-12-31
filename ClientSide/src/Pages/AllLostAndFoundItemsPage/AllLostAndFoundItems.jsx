import React, { useContext, useState } from "react";
import { AppContext } from "../../Component/Context/ContextProvider";
import LatestLostFoundItems from "../Home/LatestLostFoundItems";
import { Helmet } from "react-helmet";

const AllLostAndFoundItems = () => {
  const { items } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on the search query title or location
  const filteredItems = items.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Helmet>
        <title>All Items || Lost And Found Website</title>
      </Helmet>

      {/* Search Input */}
      <div className="search-bar w-full max-w-lg mx-auto mt-5">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* All Items Section */}
      <LatestLostFoundItems latestItems={filteredItems} />
    </div>
  );
};

export default AllLostAndFoundItems;
