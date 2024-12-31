import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Component/Context/ContextProvider";

const LatestLostFoundItems = ({ latestItems }) => {
  const { apiUrl } = useContext(AppContext);
  const pathName = location.pathname === "/allItems";

  return (
    <section className="running-latestItems py-16 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        {pathName ? "Lost and Found" : "latest"} Items: {latestItems.length}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {latestItems?.length > 0 ? (
          latestItems.map((campaign, i) => (
            <>
              <div
                key={i}
                className="campaign-card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Top Image with Overlay */}
                <div className="relative">
                  <img
                    src={`${campaign.thumbnailPath}`}
                    alt="Campaign Thumbnail"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h3 className="text-white text-lg font-bold text-center px-4">
                      {campaign.title}
                    </h3>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="p-4 text-left">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Type:{" "}
                    <span className="font-semibold">{campaign.postType}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    category:{" "}
                    <span className="font-semibold">{campaign.category}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span className="font-semibold">date:</span>{" "}
                    {new Date(campaign.dateLost).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-10">
                    <span className="font-semibold">Location:</span>{" "}
                    <span className="dark:text-green-400  text-gray-700 font-extrabold ml-3">
                      {campaign.location}
                    </span>
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={`/items/${campaign._id}`}
                    className="block  rounded-lg px-4 py-2   bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white  text-center font-extrabold transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600 dark:text-gray-400">
            No Items found.
          </p>
        )}
      </div>
      {/* See All Button */}
      {pathName ? null : (
        <div className="w-1/2 mx-auto">
          <Link
            to="/allItems"
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-lg px-4 py-2 font-bold  mt-6 block text-center"
          >
            See All
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestLostFoundItems;
