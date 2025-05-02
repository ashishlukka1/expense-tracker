import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      email: "",
      password: "", // Fixed typo from 'passowrd'
    });

    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.errors) {
        setError(data.errors);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        props.closeModalLogin();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="p-8 bg-rp-black text-white rounded-2xl font-lexend shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-3xl mb-2">Log In</h1>
          <p className="text-gray-400">Please log in to your account to manage expenses</p>
        </div>
        
        <div className="h-px bg-gray-800 w-full my-6"></div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium text-sm block">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full p-3 bg-jp-black rounded-lg border border-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-rp-yellow focus:border-transparent outline-none transition"
              />
            </div>
            {error.email && (
              <p className="text-sm text-red-500 mt-1">{error.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="font-medium text-sm block">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full p-3 bg-jp-black rounded-lg border border-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-rp-yellow focus:border-transparent outline-none transition"
              />
            </div>
            {error.password && (
              <p className="text-sm text-red-500 mt-1">{error.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-rp-yellow hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-xl bg-transparent border-2 border-rp-yellow text-rp-yellow font-bold hover:bg-rp-yellow hover:text-rp-black transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader className="animate-spin mr-2 h-5 w-5" />
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <span
              className="text-rp-yellow font-medium cursor-pointer hover:underline"
              onClick={() => {
                props.closeModalLogin();
                props.openModalSignup();
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}