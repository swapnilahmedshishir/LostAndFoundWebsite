import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../Component/Context/ContextProvider";
import { Helmet } from "react-helmet";
import { IoMdGrid } from "react-icons/io";
import { FaTable } from "react-icons/fa6";

const AllRecoveredItems = () => {
  const { apiUrl, user, items } = useContext(AppContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableLayout, setIsTableLayout] = useState(false);

  // Fetch recovered items added by the logged-in user
  useEffect(() => {
    if (user) {
      axios
        .get(`${apiUrl}/api/recovereditems`, {
          params: { email: user.email },
          withCredentials: true,
        })
        .then((response) => {
          const recoveredData = response.data;
          const joinedItems = items
            .filter((item) =>
              recoveredData.some((recovered) => recovered.itemId === item._id)
            )
            .map((item) => {
              const matchingRecovered = recoveredData.find(
                (recovered) => recovered.itemId === item._id
              );

              return {
                ...item,
                ...matchingRecovered,
              };
            });

          setRecoveredItems(joinedItems);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Failed to fetch recovered items.");
        });
    }
  }, [apiUrl, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No recovered items found. Try adding some items!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Recovered Items || Lost And Found Website </title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">
        Recovered Items ({recoveredItems.length})
      </h1>

      {/* Button to toggle layout */}
      <div className="text-right mb-6">
        <button
          onClick={() => setIsTableLayout((prev) => !prev)}
          className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-3xl font-semibold shadow-md hover:bg-gray-400 transition-colors"
        >
          {isTableLayout ? (
            <IoMdGrid title="grid" />
          ) : (
            <FaTable title="table" />
          )}
        </button>
      </div>

      {/* Conditional Rendering for Layout table & grid  */}
      {isTableLayout ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-200 text-gray-700 text-left text-sm font-semibold uppercase">
                  Title
                </th>
                <th className="py-3 px-4 bg-gray-200 text-gray-700 text-left text-sm font-semibold uppercase">
                  Type
                </th>
                <th className="py-3 px-4 bg-gray-200 text-gray-700 text-left text-sm font-semibold uppercase">
                  Lost & Found Location
                </th>
                <th className="py-3 px-4 bg-gray-200 text-gray-700 text-left text-sm font-semibold uppercase">
                  Recovered Location
                </th>
                <th className="py-3 px-4 bg-gray-200 text-gray-700 text-left text-sm font-semibold uppercase">
                  Date Recovered
                </th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-100 text-left text-gray-700"
                >
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.postType}</td>
                  <td className="py-3 px-4">{item.location}</td>
                  <td className="py-3 px-4">{item.recoveredLocation}</td>
                  <td className="py-3 px-4">
                    {new Date(item.dateLost).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Type:</span> {item.postType}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Lost & Found Location:</span>{" "}
                {item.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Recovered Location:</span>{" "}
                {item.recoveredLocation}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Date Recovered:</span>{" "}
                {new Date(item.dateLost).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecoveredItems;
