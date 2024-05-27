import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { useRefreshMutation } from "../../redux/api/authApiSlice";
import { toast } from "react-toastify";

const PersistLogin = () => {
  const persist = JSON.parse(localStorage.getItem("persist"));
  const token = useSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      // console.log("verifying refresh token");
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        toast.error(err?.data);
      }
    };

    if (!token && persist) verifyRefreshToken();
  }, [persist, refresh, token]);

  let content;
  if (!persist) {
    // persist: no
    // console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    // console.log("loading");
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    //persist: yes, token: no
    // console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/signin">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    // console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // console.log("token and uninit");
    // console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
