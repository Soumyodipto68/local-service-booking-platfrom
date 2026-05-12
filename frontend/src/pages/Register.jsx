import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import LeftSide from "../components/LeftSide";
import {
  User,
  Mail,
  Lock,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "customer",
      city: "",
      area: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration successful!"
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

return (

  <div className="min-h-screen bg-slate-950 text-white flex justify-center px-6 pt-32 pb-10 overflow-y-auto">

    <div className="w-full max-w-md">

      {/* TOP TEXT */}
      <div className="mb-10 text-center">

        <h1 className="text-4xl font-extrabold mb-3">
          Create Account
        </h1>

        <p className="text-slate-400 text-lg">
          Join ServicePoint and start booking
          trusted local professionals
        </p>

      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl p-8"
      >

        {/* FULL NAME */}
        <div className="mb-5">

          <label className="block text-sm text-slate-300 mb-2">
            Full Name
          </label>

          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

            <User
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
              required
            />

          </div>

        </div>

        {/* EMAIL */}
        <div className="mb-5">

          <label className="block text-sm text-slate-300 mb-2">
            Email Address
          </label>

          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

            <Mail
              size={18}
              className="text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
              required
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div className="mb-5">

          <label className="block text-sm text-slate-300 mb-2">
            Password
          </label>

          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

            <Lock
              size={18}
              className="text-slate-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
              required
            />

          </div>

        </div>

        {/* ROLE */}
        <div className="mb-5">

          <label className="block text-sm text-slate-300 mb-2">
            Account Type
          </label>

          <select
            name="role"
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none text-white"
          >

            <option value="customer">
              Customer
            </option>

            <option value="provider">
              Service Provider
            </option>

          </select>

        </div>

        {/* CITY */}
        <div className="mb-5">

          <label className="block text-sm text-slate-300 mb-2">
            City
          </label>

          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

            <MapPin
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
              required
            />

          </div>

        </div>

        {/* AREA */}
        <div className="mb-8">

          <label className="block text-sm text-slate-300 mb-2">
            Area
          </label>

          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

            <MapPin
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              name="area"
              placeholder="Enter your area"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
              required
            />

          </div>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.01]"
        >

          {
            loading
            ? "Creating Account..."
            : (
              <>
                Register
                <ArrowRight size={18} />
              </>
            )
          }

        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-slate-400 mt-8">

          Already have an account?{" "}

          <span
            onClick={() =>
              navigate("/login")
            }
            className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold transition"
          >
            Login
          </span>

        </p>

      </form>

    </div>

  </div>

);
};

export default Register;