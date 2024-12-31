import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppContext } from "../../Component/Context/ContextProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const PostDetails = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const { apiUrl, user } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recoveredData, setRecoveredData] = useState({
    recoveredLocation: "",
    date: new Date(),
  });

  // Fetch item details
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/items/${id}`, {
          withCredentials: true,
        });
        setItemData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Unable to fetch item details. Please try again later.");
      }
    };
    fetchItemDetails();
  }, [id, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecoveredData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setRecoveredData((prevData) => ({ ...prevData, date }));
  };

  const handleSubmit = async () => {
    if (!recoveredData.recoveredLocation) {
      toast.error("Please enter the recovered location.");
      return;
    }

    const recoverItem = {
      ...recoveredData,
      user: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      itemId: id,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/api/recoverItem`,
        recoverItem,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Item successfully marked as recovered.");
        setShowModal(false);
        setItemData((prev) => ({ ...prev, status: "recovered" }));
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      const message =
        error.response?.data?.error || "Failed to mark item as recovered.";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Item not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-left max-w-4xl">
      <Helmet>
        <title>Post Details || Lost And Found Website </title>
      </Helmet>
      {/* Image Section */}
      <img
        src={`${itemData?.thumbnailPath}`}
        alt={itemData?.title}
        className="w-full h-64 md:h-96 object-cover rounded shadow"
      />

      {/* Details Section */}
      <h1 className="text-2xl font-bold mt-4">Title : {itemData?.title}</h1>
      <p className="text-gray-600 text-sm font-semibold dark:text-gray-400 mb-2">
        Type: <span className="mt-10">{itemData?.postType}</span>
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
        category: <span className="font-semibold">{itemData?.category}</span>
      </p>

      <p className="text-gray-600 dark:text-gray-400 text-sm">
        <span className="font-semibold">date:</span>{" "}
        {new Date(itemData?.dateLost).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-700">description: {itemData?.description}</p>
      <p className="mt-1 text-gray-500">
        <strong>Location:</strong> {itemData?.location}
      </p>

      {/* Conditional Button */}
      {itemData.status === "recovered" ? (
        <div className="mt-6 text-green-600 font-bold">
          This item has already been recovered.
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-lg px-4 py-2 font-bold mt-6 block text-center"
          onClick={() => setShowModal(true)}
        >
          {itemData?.postType === "Lost" ? "Found This!" : "This is Mine!"}
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Mark Item as Recovered</h2>
            <div className="flex items-center justify-center mb-4">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <p className="p-2 w-full rounded">{user?.displayName}</p>
            </div>
            <input
              type="text"
              name="email"
              value={user?.email}
              className="border p-2 w-full rounded mb-4"
              readOnly
            />

            <input
              type="text"
              name="recoveredLocation"
              placeholder="Recovered Location"
              value={recoveredData.recoveredLocation}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mb-4"
            />
            <DatePicker
              selected={recoveredData.date}
              onChange={handleDateChange}
              className="border p-2 w-full rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-lg px-4 py-2 font-bold  mr-2 block text-center"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
