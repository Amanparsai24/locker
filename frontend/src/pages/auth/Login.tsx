import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import WebService from "../../utility/WebService";
import { useUserStore } from "../../store/userStore";
import { toast } from "react-hot-toast";
import type { User } from "../../types/user";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message?: string;
  result: User;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await WebService.postAPI<LoginFormData, LoginResponse>({
        action: "users/login",
        body: data,
        id: "login-btn",
      });
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("user", JSON.stringify(res.result));
      setUser(res.result, res.token);
      toast.success(res.message || "Login successful");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          id="login-btn"
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
