import {Link} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {user,logout} = useAuth();
  return (
    <nav className="  bg-slate-900 px-8 py-4 flex justify-between items-center text-white">
      <Link to="/" className="text-2xl font-bold">
        Local Services
      </Link>
      <div className="flex gap-6">
        {
          !user && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )
        }
        {
          user?.role === "customer" && (
            <Link
              to="/customer/dashboard"
            >
              Dashboard
            </Link>
          )
        }
        {
          user?.role === "provider" && (
            <Link
              to="/provider/dashboard"
            >
              Dashboard
            </Link>
          )
        }

        {
          user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          )
        }

        {
          user && (
            <button
              onClick={logout}
              className="cursor-pointer"
            >
              <Link to="/login">Logout</Link>
              
            </button>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;