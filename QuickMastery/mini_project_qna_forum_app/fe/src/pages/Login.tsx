import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../stores/auth.store";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setIsAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        data: {
          data: { role },
        },
      } = await api.post("/auth/login", { email, password });
      setAuth(true, role === "admin");
      navigate("/");
    } catch (err) {
      setAuth(false, false);
      setError("Something went wrong, try again later. Error: " + err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
