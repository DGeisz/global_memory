import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Landing } from "./pages/landing/landing.tsx";
import { ProjectOverview } from "./pages/editor/project_overview.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/user/:userId",
    children: [
      {
        path: "project/:projectId",
        element: <ProjectOverview />,
        children: [{ path: "frame/:frameId" }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
