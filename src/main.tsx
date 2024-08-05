import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Landing } from "./pages/landing/landing.tsx";
import { ProjectOverview } from "./pages/editor/project_overview.tsx";
import { EventEditor } from "./pages/editor/event_editor.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/user/:userId",
  },
  {
    path: "user/:userId/project/:projectId",
    element: <ProjectOverview />,
  },
  {
    path: "user/:userId/project/:projectId/event/:eventId",
    element: <EventEditor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
