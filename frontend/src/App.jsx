import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ToDos from "./components/todos/ToDos";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersistLogin from "./components/auth/PersistLogin";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/todos" element={<ToDos />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
