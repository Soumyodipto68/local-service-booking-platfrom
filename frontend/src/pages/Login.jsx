import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import LeftSide from "../components/LeftSide";
import {
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      login(res.data.user);

      toast.success(
        "Login successful"
      );

      // ROLE REDIRECT
      if (
        res.data.user.role ===
        "customer"
      ) {
        navigate("/");
      }

      else if (
        res.data.user.role ===
        "provider"
      ) {
        navigate("/");
      }

      else if (
        res.data.user.role ===
        "admin"
      ) {
        navigate(
          "/admin/dashboard"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-10">
        <LeftSide />
      </div>
      

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-10">

        <div className="w-full max-w-md">

          {/* TOP TEXT */}
          <div className="mb-10 text-center">

            <h1 className="text-4xl font-extrabold mb-3">
              Welcome Back
            </h1>

            <p className="text-slate-400 text-lg">
              Login to continue using
              Fixora
            </p>

          </div>

          {/* FORM CARD */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl p-8 md:p-10"
          >

            {/* EMAIL */}
            <div className="mb-5">

              <label className="text-sm text-slate-300 mb-2 block">
                Email Address
              </label>

              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="mb-8">

              <label className="text-sm text-slate-300 mb-2 block">
                Password
              </label>

              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

                <Lock
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
                  required
                />

              </div>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.01]"
            >

              {
                loading
                ? "Logging in..."
                : (
                  <>
                    Login
                    <ArrowRight
                      size={18}
                    />
                  </>
                )
              }

            </button>

            {/* REGISTER LINK */}
            <p className="text-center text-slate-400 mt-8">

              Don’t have an account?{" "}

              <span
                onClick={() =>
                  navigate(
                    "/register"
                  )
                }
                className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold transition"
              >
                Create Account
              </span>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;