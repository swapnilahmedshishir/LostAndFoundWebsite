import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContextProvider from "./Component/Context/ContextProvider.jsx";
import RoutersItems from "./Component/Router/Router.jsx";

const router = createBrowserRouter(RoutersItems, {
  future: {
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
