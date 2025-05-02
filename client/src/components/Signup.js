import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Client-side validation before submission
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!user.name.trim()) {
      newErrors.name = "Required";
      isValid = false;
    }

    if (!user.email.trim()) {
      newErrors.email = "Required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    if (!user.password) {
      newErrors.password = "Required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Min 6 characters";
      isValid = false;
    }

    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch("/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const data = await res.json();
      
      if (data.errors) {
        setErrors(data.errors);
      } else {
        props.closeModalSignup();
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: "An error occurred. Please try again."
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-lexend">
      <div className="p-4 bg-rp-black text-white rounded-lg">
        <h1 className="font-bold text-xl">Sign Up</h1>
        <p className="text-gray-300 text-xs">Create your account</p>
        
        <hr className="border-gray-700 my-2"></hr>
        
        {errors.general && (
          <div className="mb-2 p-2 bg-red-900/20 border border-red-500 rounded text-red-400 text-xs">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="text-sm">
          <div className="space-y-2">
            {/* Name Field */}
            <div className="grid grid-cols-12 gap-1 items-center">
              <label htmlFor="name" className="font-medium col-span-4">
                Name
              </label>
              <div className="col-span-8">
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter name"
                  className={`w-full p-2 bg-jp-black rounded-md outline-none ${
                    errors.name ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-rp-yellow"
                  } placeholder-gray-500 text-sm`}
                />
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
            
            {/* Email Field */}
            <div className="grid grid-cols-12 gap-1 items-center">
              <label htmlFor="email" className="font-medium col-span-4">
                Email
              </label>
              <div className="col-span-8">
                <input
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  className={`w-full p-2 bg-jp-black rounded-md outline-none ${
                    errors.email ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-rp-yellow"
                  } placeholder-gray-500 text-sm`}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="grid grid-cols-12 gap-1 items-center">
              <label htmlFor="password" className="font-medium col-span-4">
                Password
              </label>
              <div className="col-span-8">
                <input
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className={`w-full p-2 bg-jp-black rounded-md outline-none ${
                    errors.password ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-rp-yellow"
                  } placeholder-gray-500 text-sm`}
                />
                {errors.password && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="grid grid-cols-12 gap-1 items-center">
              <label htmlFor="confirmPassword" className="font-medium col-span-4">
                Confirm
              </label>
              <div className="col-span-8">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="Confirm password"
                  className={`w-full p-2 bg-jp-black rounded-md outline-none ${
                    errors.confirmPassword ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-rp-yellow"
                  } placeholder-gray-500 text-sm`}
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-300 mt-3 mb-3">
            By creating an account you agree to our{" "}
            <a className="text-rp-yellow hover:underline cursor-pointer">terms</a>
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-bold p-2 rounded-md border border-rp-yellow text-rp-yellow hover:bg-rp-yellow hover:text-rp-black transition-all duration-200 flex justify-center items-center text-sm"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin mr-1 h-3 w-3 border-t-2 border-b-2 border-current rounded-full"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center mt-3 text-xs">
          <span className="text-gray-300">Already have an account?</span>{" "}
          <button
            className="text-rp-yellow hover:underline"
            onClick={() => {
              props.closeModalSignup();
              props.openModalLogin();
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}