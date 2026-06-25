import { useNavigate } from "react-router-dom";
import { useFakeAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useFakeAuth();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [navigate, isAuth]);

  return isAuth ? children : null;
}

export default ProtectedRoute;
