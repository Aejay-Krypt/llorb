import { useSelector } from "react-redux";
import Navbar from "./layouts/navbar";
import Home from "./layouts/home";
import Login from "./layouts/login";
import { getToken, getUser } from "./store/slices/authSlice";
import Register from "./layouts/register";

export default function App() {
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  const currentPath = window.location.pathname;
  const segments = currentPath.split("/");
  const lastSegment = segments[segments.length - 1];

  return (
    <div className="pb-24 h-screen overflow-hidden">
      {lastSegment == "register" && <Register />}
      {(token == "" && user) ||
      (token == "" && user && lastSegment == "login") ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <Home />
        </>
      )}
    </div>
  );
}
