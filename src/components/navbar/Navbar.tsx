import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiFillSetting,
  AiFillMessage,
  AiFillBell,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IconType } from "react-icons";
import Icon from "../icon/Icon";

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: IconType;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 5 items de navigation avec icônes différentes
  const navItems: NavItem[] = [
    { id: "home", path: "/", label: "Home", icon: AiFillHome },
    { id: "profile", path: "/profile", label: "Profile", icon: FaUser },
    {
      id: "settings",
      path: "/settings",
      label: "Settings",
      icon: AiFillSetting,
    },
    {
      id: "messages",
      path: "/messages",
      label: "Messages",
      icon: AiFillMessage,
    },
    {
      id: "notifications",
      path: "/notifications",
      label: "Notifications",
      icon: AiFillBell,
    },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center py-3 px-4">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => handleNavClick(item.path)}
          >
            <Icon
              icon={item.icon}
              size="lg"
              color={isActive(item.path) ? "#3b82f6" : "#6b7280"}
              className="transition-colors duration-200"
            />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
