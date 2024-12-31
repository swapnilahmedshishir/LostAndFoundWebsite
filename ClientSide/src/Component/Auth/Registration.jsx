import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AppContext } from "../Context/ContextProvider";

const Registration = () => {
  const { RegisterUser, setUser, loginWithGoogle } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = 6;

    if (!uppercase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (password.length < minLength) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  // Registration function
  const handleRegister = (e) => {
    e.preventDefault();
    const passwordValidationMessage = validatePassword(password);

    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      toast.error(passwordValidationMessage);
      return;
    }
    if (email && password) {
      RegisterUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name,
            photoURL: photoUrl,
          });
          // Signed up info
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: name,
            photoURL: photoUrl,
          };
          setUser(userData);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      toast.success("Registration successful!");
      navigate("/");
    } else {
      toast.error("Registration failed. Please check your input.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google account registered successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Google registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white px-4 py-20 mb-3">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center dark:text-white text-gray-800 mb-6">
          User Registration
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block dark:text-white text-gray-700 font-medium mb-2 text-left">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full dark:border-gray-600 dark:bg-gray-700 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block dark:text-white text-gray-700 font-medium mb-2 text-left">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full dark:border-gray-600 dark:bg-gray-700 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              required
            />
          </div>

          {/* Photo URL Field */}
          <div>
            <label className="block dark:text-white text-gray-700 font-medium mb-2 text-left">
              Photo URL
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Enter your photo URL"
              className="w-full dark:border-gray-600 dark:bg-gray-700 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block dark:text-white text-gray-700 font-medium mb-2 text-left">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Enter your password"
              className="w-full dark:border-gray-600 dark:bg-gray-700 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              required
            />
            <div
              className="absolute right-3 top-11 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 dark:text-white">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google register Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full py-3 bg-[#031741] text-white font-bold rounded-lg  transition duration-300 flex gap-3 justify-center items-center"
        >
          <FaGoogle /> Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 dark:text-white mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-teal-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
