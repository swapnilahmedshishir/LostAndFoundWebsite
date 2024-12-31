import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../Auth/FirebaseAuth";
import axios from "axios";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // api url
  // const apiUrl = "http://localhost:5001";
  const apiUrl = "https://server-side-seven-beta.vercel.app";

  // user State
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/items`).then((response) => {
      setItems(response.data);
    });
  }, []);

  // singup or Register user
  const RegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sinIn or login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout User
  const logoutUser = () => {
    return signOut(auth);
  };
  // any change user Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const loggedInUser = {
          uid: currentUser.uid,
          displayName: currentUser?.displayName,
          email: currentUser?.email,
          photoURL: currentUser?.photoURL,
        };
        if (currentUser?.email) {
          const user = { email: currentUser?.email };
          await axios
            .post(`${apiUrl}/api/jwt`, user, { withCredentials: true })
            .then((response) => {
              console.log("response", response.data);
            });
        }
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        try {
          await axios.post(
            `${apiUrl}/api/logout`,
            {},
            { withCredentials: true }
          );
        } catch (error) {
          console.error("Error logging out:", error);
        }
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const contextApiValue = {
    apiUrl,
    user,
    setUser,
    RegisterUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    items,
    setItems,
  };

  return (
    <AppContext.Provider value={contextApiValue}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
