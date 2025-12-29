import { useLocation, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiFillSetting,
  AiFillFolder,
  AiFillFileText,
} from "react-icons/ai";
import { IconType } from "react-icons";
import Icon from "../icon/Icon";
import { MdQuiz } from "react-icons/md";

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
    {
      id: "resources",
      path: "/resources",
      label: "Ressources",
      icon: AiFillFolder,
    },
    { id: "run-quiz", path: "/run-quiz", label: "Quiz", icon: MdQuiz },
    {
      id: "articles",
      path: "/articles",
      label: "Articles",
      icon: AiFillFileText,
    },
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
    if (path === "/run-quiz") {
      return location.pathname.toLowerCase().includes("quiz");
    }
    if (path === "/settings") {
      return [
        "/settings",
        "/about",
        "/cgu",
        "/faq",
        "/privacy-policy",
      ].includes(location.pathname);
    }
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
