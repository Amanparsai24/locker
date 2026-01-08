import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import UsersPage from "./pages/users";
import Expenses from "./pages/expenses/index";

export const publicRoutes = [
    { path: "/login", element: Login },
    { path: "/signup", element: Signup },
];

export const protectedRoutes = [
    { path: "/", element: Dashboard },
    { path: "/users", element: UsersPage },
    { path: "/expenses", element: Expenses },
    //   { path: "/assets", element: Assets },
    //   { path: "/tasks", element: Tasks },
];
