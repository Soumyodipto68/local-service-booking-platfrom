import {Navigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({children}) => {
  const {user,loading} = useAuth();
  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }
  // IF USER ALREADY LOGGED IN
  if (user) {
    if (user.role === "customer") {
      return (
        <Navigate
          to="/"
        />
      );
    }
    else if (
      user.role === "provider"
    ) {
      return (
        <Navigate
          to="/"
        />
      );

    }
    else if (
      user.role === "admin"
    ) {
      return (
        <Navigate
          to="/admin/dashboard"
        />
      );

    }
  }
  return children;
};

export default PublicRoute;