import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Wrench, LayoutDashboard, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    `px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/30 group-hover:scale-105 transition">
            <Wrench size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              ServicePoint
            </h1>

            <p className="text-xs text-slate-400 -mt-1">
              Local Service Platform
            </p>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4">

          {!user && (
            <>
              <NavLink
                to="/login"
                className={navLinkStyle}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold shadow-lg shadow-blue-600/30"
              >
                Get Started
              </NavLink>
            </>
          )}

          {/* CUSTOMER */}
          {user?.role === "customer" && (
            <NavLink
              to="/customer/dashboard"
              className={navLinkStyle}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard
              </div>
            </NavLink>
          )}

          {/* PROVIDER */}
          {user?.role === "provider" && (
            <NavLink
              to="/provider/dashboard"
              className={navLinkStyle}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard
              </div>
            </NavLink>
          )}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <NavLink
              to="/admin/dashboard"
              className={navLinkStyle}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                Admin Panel
              </div>
            </NavLink>
          )}

          {/* USER INFO */}
          {user && (
            <NavLink to={`/${user.role}/profile`}>
            <div className="flex items-center gap-4 ml-4">

              {/* USER AVATAR */}
              <div className="flex items-center gap-3 cursor-pointer bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">

                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-white">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-400 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold shadow-lg shadow-red-600/20"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
            </NavLink>

          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;