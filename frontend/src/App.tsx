import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "./routes";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";
import WebService from "./utility/WebService";
import type { User } from "./types/user"; // Adjust the path based on where User type is defined

function App() {
  // const token = useUserStore((s) => s.token);
  const { token, setUser, logout } = useUserStore();
  const isAuthenticated = () => !!token;

  useEffect(() => {
    if (!token) return;

    WebService.getAPI<{ result: User }>("users/me")
      .then((res) => {
        setUser(res.result, token);
      })
      .catch(() => logout());

  }, [token, setUser, logout]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <PublicLayout>
                <Element />
              </PublicLayout>
            }
          />
        ))}

        {/* Protected Routes */}
        {protectedRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              isAuthenticated() ? (
                <ProtectedLayout>
                  <Element />
                </ProtectedLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        ))}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
