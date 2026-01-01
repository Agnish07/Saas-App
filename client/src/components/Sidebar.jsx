import { useClerk, useUser, Protect } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!isLoaded) {
    return (
      <div
        className={`w-60 bg-[#212121] border-r border-[#2A2A2A] max-sm:absolute top-14 bottom-0 ${
          sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      />
    );
  }

  return (
    <div
      className={`w-60 bg-[#191919] border-r border-[#2A2A2A] text-[#E6E6E6] flex flex-col justify-between max-sm:absolute top-14 bottom-0
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      transition-all duration-300 ease-in-out`}
    >

      {/* User Profile */}
      <div className="mt-8 mb-6 text-center">
        <img
          src={user?.imageUrl}
          alt="profile"
          className="w-16 h-16 rounded-full mx-auto shadow-[0_0_12px_#00000055]"
        />
        <h1 className="mt-3 text-sm font-medium text-[#E6E6E6]">
          {user?.fullName}
        </h1>
      </div>

      {/* Navigation */}
      <div className="w-full flex flex-col gap-1 px-4">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/ai"}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `px-3.5 py-2.5 flex items-center gap-3 rounded-md text-sm transition-all ${
                isActive
                  ? "bg-[#313131] text-white shadow-[0_0_12px_#00000055]"
                  : "text-[#9E9E9E] hover:text-[#E6E6E6] hover:bg-[#1a1a1a]"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      {/* Account Section */}
<div className="w-full px-4 mt-8 pb-6">
  <div className="flex items-center justify-between px-3 py-3 bg-[#2A2A2A] rounded-md hover:bg-[#313131] transition cursor-pointer">
    
    {/* Profile + Name (Click → Open Clerk Profile Page) */}
    <div onClick={openUserProfile} className="flex items-center gap-3">
      <img
        src={user?.imageUrl}
        className="w-10 h-10 rounded-full"
        alt="profile"
      />
      <div className="text-xs">
        <h1 className="text-[#E6E6E6] capitalize">{user?.fullName}</h1>
        <p className="text-[#9E9E9E] text-[11px] flex gap-1">
          <Protect plan="premium" fallback="Free">Premium</Protect> Plan
        </p>
      </div>
    </div>

    {/* Logout Icon */}
    <LogOut
      onClick={signOut}
      className="w-4 h-4 text-[#9E9E9E] hover:text-[#E6E6E6] transition cursor-pointer"
    />
  </div>
</div>


    </div>
  );
};

export default Sidebar;
