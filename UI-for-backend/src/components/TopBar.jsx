import React from "react";
import Logo from "../assets/logo.jpg";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { useState } from "react";
import SideNav from "./SideNav";

function TopBar({ isSidebarOpen, setIsSidebarOpen }) {
  const { user } = useAuth();
  const imageUrl = `http://localhost:5000/uploads/${user.profileImage}`;
  return (
    <div className="h-[60px] w-full flex justify-between items-center px-8 bg-[#f6f8fa] overflow-auto">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Menu */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hamburger-btn cursor-pointer"
        >
          <Menu size={26} />
        </button>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <div className="logo-wrapper flex h-10 w-10 rounded-full overflow-hidden">
            <img src={Logo} alt="Logo" className="h-full w-full object-cover" />
          </div>
          <p className="text-sm font-semibold leading-none uppercase tracking-tighter">
            Backend
          </p>
        </Link>
      </div>
      {/* Middle */}
      <SearchBar />
      {/* Right */}
      <div className="flex items-center">
        <Link to="/profile" className="cursor-pointer">
          <div className="logo-wrapper flex h-10 w-10 rounded-full border border-gray-300 overflow-hidden">
            <img
              src={imageUrl}
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
