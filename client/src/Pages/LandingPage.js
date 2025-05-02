import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Vector from "../assets/Vector.svg";
import Menu from "../assets/mobile_bar.png";
import Close from "../assets/close.png";

export default function LandingPage(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetch("user/logout");
    props.setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const checklogin = async () => {
      const res = await fetch("/user/auth");
      const data = await res.json();
      console.log(data);
      if (data.msg === "Login to Proceed") {
        props.setIsLoggedIn(false);
      } else {
        props.setIsLoggedIn(true);
      }
    };
    checklogin();
  }, []);

  const [isMobile, setIsMobile] = useState(true);

  return (
    <div className="w-screen h-screen bg-rp-black overflow-x-hidden">
      {/* Mobile Navigation */}
      <nav className="lg:hidden px-6 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-rp-yellow text-2xl font-bold">Expense Tracker</h1>
          <button
            className="bg-mj-yellow rounded-lg p-2 transition-all duration-300 hover:shadow-md"
            onClick={() => setIsMobile(!isMobile)}
          >
            {isMobile ? (
              <img src={Menu} className="h-6 w-6" alt="Menu" />
            ) : (
              <img src={Close} className="h-6 w-6" alt="Close" />
            )}
          </button>
        </div>
        
        <div
          onClick={() => setIsMobile(true)}
          className={
            isMobile
              ? "hidden"
              : "mt-4 bg-rp-black/95 absolute left-0 right-0 p-6 rounded-b-lg shadow-lg z-50 flex flex-col items-center space-y-4"
          }
        >
          <div
            onClick={props.openModalContact}
            className="text-mj-yellow py-3 px-6 cursor-pointer hover:bg-jp-black rounded-lg w-full text-center font-medium transition-all duration-200"
          >
            Contact Us
          </div>

          {props.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-mj-yellow text-mj-black w-full py-2 rounded-lg font-semibold hover:bg-rp-yellow transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={props.openModalLogin}
              className="bg-mj-yellow text-mj-black w-full py-2 rounded-lg font-semibold hover:bg-rp-yellow transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-8 py-6">
        <h1 className="text-rp-yellow text-3xl font-bold tracking-tight">
          Expense Tracker
        </h1>
        
        <div className="flex items-center space-x-8">
         
          
          {props.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-mj-yellow text-mj-black px-6 py-2 rounded-lg font-semibold hover:bg-rp-yellow transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={props.openModalLogin}
              className="bg-mj-yellow text-mj-black px-6 py-2 rounded-lg font-semibold hover:bg-rp-yellow transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:pr-6">
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              The <span className="text-mj-yellow underline decoration-2 decoration-mj-yellow/70">Expense Tracker</span> that works for you
            </h2>
            
            <p className="mt-6 text-lg lg:text-xl text-slate-300">
              Take control of your finances. Track, analyze, and optimize your expenses in one place.
            </p>
            
            <div className="mt-8 lg:mt-10">
              {props.isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="bg-mj-yellow text-mj-black px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-rp-yellow transition-all duration-300 shadow-lg"
                >
                  <span>Go to Dashboard</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={props.openModalSignup}
                  className="bg-mj-yellow text-mj-black px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-rp-yellow transition-all duration-300 shadow-lg"
                >
                  <span>Get Started Today</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="mt-8 hidden lg:flex space-x-3 text-slate-400">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mj-yellow mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Easy tracking</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mj-yellow mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Smart insights</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mj-yellow mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure data</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="mt-10 lg:mt-0 flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-mj-yellow/30 to-rp-yellow/30 rounded-lg blur-xl opacity-75"></div>
              <div className="relative">
                <img 
                  src={Vector} 
                  alt="Expense tracking illustration" 
                  className="w-full h-auto object-contain rounded-lg" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}