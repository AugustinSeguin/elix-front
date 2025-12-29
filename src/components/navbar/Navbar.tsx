import { useLocation, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiFillSetting,
  AiFillCalendar,
  AiFillMessage,
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
    { id: "home", path: "/", label: "Accueil", icon: AiFillHome },
    { id: "calendar", path: "/calendar", label: "EDT", icon: AiFillCalendar },
    {
      id: "messages",
      path: "/messages",
      label: "Message",
      icon: AiFillMessage,
    },
    { id: "profile", path: "/profile", label: "Profil", icon: FaUser },
    {
      id: "settings",
      path: "/settings",
      label: "Setting",
      icon: AiFillSetting,
    },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[52px] md:h-[83px] bg-white border-t border-[#DEDEDE] flex flex-col items-center pt-[7px] pb-0 px-[12px] z-50">
      <div className="flex justify-between items-center w-full max-w-[369px] px-[10px]">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-[2px] cursor-pointer"
            onClick={() => handleNavClick(item.path)}
          >
            <Icon
              icon={item.icon}
              size="lg"
              className={`transition-colors duration-200 ${
                isActive(item.path) ? "text-primary" : "text-secondary"
              }`}
            />
            <span
              className={`text-[10px] font-medium ${
                isActive(item.path) ? "text-primary" : "text-secondary"
              }`}
            ></span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
