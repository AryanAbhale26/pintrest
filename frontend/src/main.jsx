import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CreatePage = lazy(() => import("./pages/CreatePage/CreatePage.jsx"));
const PostPage = lazy(() => import("./pages/PostPage/PostPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage.jsx"));
const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/Profile.jsx"));
const MainLayout = lazy(() => import("./pages/Layout/MainLayout.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/pin/:id" element={<PostPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/:username" element={<ProfilePage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
