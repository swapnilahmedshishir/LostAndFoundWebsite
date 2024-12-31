import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from "../../Component/Context/ContextProvider";
import { FaEye } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const MySwal = withReactContent(Swal);

const MyItems = () => {
  const { apiUrl, user } = useContext(AppContext);

  const [items, setitems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items added by the logged-in user
  useEffect(() => {
    if (user) {
      axios
        .get(`${apiUrl}/api/myitems`, {
          params: { email: user.email },
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          setitems(response.data);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Could not fetch your items.");
        });
    }
  }, [apiUrl, user]);

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}/api/items/${id}`)
          .then(() => {
            setitems(items.filter((item) => item._id !== id));
            MySwal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The item has been deleted.",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch((error) => {
            toast.error("Failed to delete the item.");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
        You have not added any items.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-gray-800 dark:text-gray-200 bg-white text-gray-900">
      <Helmet>
        <title>Manage my Items || Lost And Found Website </title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6">
        My items {items.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Title
              </th>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Type
              </th>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                date
              </th>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Location
              </th>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 text-left"
              >
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {item.title}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {item.postType}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {new Date(item.dateLost).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {item.location}
                </td>
                <td className="py-3 px-4 flex items-center gap-4">
                  {/* need a tool tip when user hover this icon then show the view */}
                  <Link to={`/items/${item._id}`}>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded"
                      title="View Item"
                    >
                      <FaEye />
                    </button>
                  </Link>
                  <Link to={`/updateItems/${item._id}`}>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                      title="Edit Item"
                    >
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    title="Delete Item"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyItems;
