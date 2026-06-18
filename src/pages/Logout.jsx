import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    navigate("/");
  }, [navigate]);

  return null;
}

export default Logout;