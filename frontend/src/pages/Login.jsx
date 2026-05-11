import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);
      // SAVE USER
      login(res.data.user);
      // ROLE REDIRECT
      if (res.data.user.role === "customer") {
        navigate("/");
      } else if (res.data.user.role === "provider") {
        navigate("/");
      } else if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-white">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 h-full flex-col justify-center items-center bg-gradient-to-br from-blue-700 via-purple-700 to-slate-800 p-12">
        <h2 className="text-4xl font-extrabold mb-6">Welcome Back</h2>
        <p className="text-lg text-gray-200 max-w-md text-center">
          Log in to continue exploring your dashboard and manage your account
          with ease.
        </p>
        <div className="mt-10 bg-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Benefits of Logging In</h3>
          <ul className="space-y-2 text-gray-300">
            <li>✔ Personalized dashboard</li>
            <li>✔ Manage your profile</li>
            <li>✔ Access exclusive features</li>
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 h-full justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-8 space-y-6"
        >
          <h1 className="text-center text-3xl font-extrabold tracking-wide">
            Login
          </h1>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
