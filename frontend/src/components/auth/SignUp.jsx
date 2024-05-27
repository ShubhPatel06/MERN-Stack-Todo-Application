import { useEffect, useState } from "react";
import { useSignupMutation } from "../../redux/api/authApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Created");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/signin");
    }

    if (isError) {
      toast.error(error?.data);
    }
  }, [isSuccess, isError, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData);
    } catch (error) {
      toast.error(error?.data?.message);
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
        <h2 className="mb-2 text-3xl font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          name="name"
          id="name"
          className="p-3 border-2 rounded-md border-slate-500"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

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
          className="p-3 mb-2 font-semibold text-white uppercase rounded-md bg-emerald-500 hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? <PulseLoader color="#fff" /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
