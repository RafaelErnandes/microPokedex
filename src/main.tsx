import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { About } from "./pages/About/index.tsx";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/About/:pokemonId",
    element: <About />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>
);
