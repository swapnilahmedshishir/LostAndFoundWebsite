import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppContext } from "../../Component/Context/ContextProvider";
import { Helmet } from "react-helmet";

const AddLostFoundItem = () => {
  const navigate = useNavigate();
  const { user, apiUrl } = useContext(AppContext);

  const coludName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // Initialize form data with default values
  const [formData, setFormData] = useState({
    postType: "Lost",
    thumbnail: null,
    title: "",
    description: "",
    category: "pets",
    location: "",
    dateLost: new Date(),
    contactName: user?.displayName || "",
    contactEmail: user?.email || "",
  });

  // Handle input change for text and select fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_upload_preset");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${coludName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data.secure_url;
      setFormData((prevData) => ({ ...prevData, thumbnail: imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.error?.message ||
          "Failed to upload the image. Please try again."
      );
    }
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dateLost: date,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.location) {
      toast.error("Please fill out all required fields.");
      return;
    }
    if (!formData.thumbnail) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/additems`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Item added successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to add item.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className="add-lost-found-item py-16 px-4 bg-blue-50 dark:bg-gray-900 dark:text-white">
      <Helmet>
        <title> Add Lost or Found Item || Lost And Found Website </title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Lost or Found Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Post Type */}
          <div>
            <label className="block mb-2 font-semibold">Post Type</label>
            <select
              name="postType"
              value={formData.postType}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block mb-2 font-semibold">
              Thumbnail (Image)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
            {formData.thumbnail && (
              <img
                src={formData.thumbnail}
                alt="Preview"
                className="mt-4 max-w-xs"
              />
            )}
          </div>
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a title"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a description"
              className="w-full border rounded-lg px-4 py-2"
              rows="4"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="pets">Pets</option>
              <option value="documents">Documents</option>
              <option value="gadgets">Gadgets</option>
              <option value="others">Others</option>
            </select>
          </div>
          {/* Location */}
          <div>
            <label className="block mb-2 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              placeholder="Enter a location"
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          {/* Date Lost */}
          <div>
            <label className="block mb-2 font-semibold">Date Lost</label>
            <DatePicker
              selected={formData.dateLost}
              onChange={handleDateChange}
              className="w-full border rounded-lg px-4 py-2"
              dateFormat="d, MMM, yyyy"
              required
            />
          </div>

          {/* Contact Information */}
          <div>
            <label className="block mb-2 font-semibold">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              readOnly
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              readOnly
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-lg px-4 py-2 font-bold"
          >
            Add Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddLostFoundItem;
