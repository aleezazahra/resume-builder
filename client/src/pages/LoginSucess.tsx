import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard"); // Or wherever your resumes are
    }
  }, [params, navigate]);

  return <div>Authenticating...</div>;
}