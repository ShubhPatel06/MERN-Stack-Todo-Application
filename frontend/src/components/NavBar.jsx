import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../redux/api/authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const navigate = useNavigate();
  const { _id, name } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/signin");

    if (isError) {
      toast.error(error?.data);
    }
  }, [isSuccess, navigate, error, isError]);

  return (
    <nav className="flex items-center justify-between p-4 font-semibold text-white bg-blue-400">
      <Link to="/todos">
        <h1 className="text-base md:text-xl">ToDos</h1>
      </Link>
      {name !== "" && (
        <span className="text-base md:text-lg">Hello {name}</span>
      )}
      <div className="flex items-center gap-4 uppercase">
        {_id ? (
          <button className="uppercase" onClick={sendLogout}>
            {isLoading ? <PulseLoader color="#fff" /> : "Sign Out"}
          </button>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
