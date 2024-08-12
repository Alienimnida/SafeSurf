import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import Search from './pages/Search.jsx';
import Result from './pages/Result.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/result",
    element: <Result />
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
