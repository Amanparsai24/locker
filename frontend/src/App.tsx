import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "./routes";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";

// Dummy auth check
// const isAuthenticated = () => !!localStorage.getItem("userToken");
const isAuthenticated = () => true; // For testing purposes


function App() {
  return (
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

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
