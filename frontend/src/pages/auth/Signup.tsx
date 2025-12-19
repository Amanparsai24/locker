import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
