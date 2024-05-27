import { useState } from "react";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login(formData).unwrap();
      dispatch(setCredentials({ accessToken }));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/todos");
    } catch (error) {
      toast.error(error?.data);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className="max-w-lg p-6 mx-auto border rounded-md shadow-md text-slate-700 mt-7">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <h2 className="mb-2 text-3xl font-semibold text-center">Sign In</h2>
        <input
          type="email"
          name="email"
          id="email"
          className="p-3 border-2 rounded-md border-slate-500"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          id="password"
          className="p-3 border-2 rounded-md border-slate-500"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="p-3 mb-2 font-semibold text-white uppercase bg-blue-500 rounded-md hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? <PulseLoader color="#fff" /> : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
