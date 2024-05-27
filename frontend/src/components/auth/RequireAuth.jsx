import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { name } = useAuth();

  const content =
    name !== "" ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );

  return content;
};
export default RequireAuth;
