import { useLocation, useNavigate } from "react-router-dom";
interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: string;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 5 items de navigation avec icônes différentes
  const navItems: NavItem[] = [
    { id: "home", path: "/", label: "Accueil", icon: "/home.svg" },
    { id: "run-quiz", path: "/run-quiz", label: "Quiz", icon: "/game.svg" },
    {
      id: "resources",
      path: "/resources",
      label: "Ressources",
      icon: "/resources.svg",
    },
    {
      id: "articles",
      path: "/articles",
      label: "Articles",
      icon: "/articles.svg",
    },
    {
      id: "profile",
      path: "/profile",
      label: "Profil",
      icon: "/profile.svg",
    },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === "/run-quiz") {
      return location.pathname.toLowerCase().includes("quiz");
    }
    if (path === "/articles") {
      return location.pathname.toLowerCase().includes("article");
    }
    if (path === "/resources") {
      return location.pathname.toLowerCase().includes("resource");
    }
    return location.pathname === path;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-[52px] md:h-[83px] border-t border-[#DEDEDE] flex flex-col items-center pt-[7px] pb-0 px-[12px] z-50"
      style={{ backgroundColor: "var(--color-primary-700)" }}
    >
      <div className="flex justify-between items-center w-full max-w-[369px] px-[10px]">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-[2px] cursor-pointer"
            onClick={() => handleNavClick(item.path)}
          >
            <span
              role="img"
              aria-label={item.label}
              className="h-6 w-6"
              style={{
                backgroundColor: isActive(item.path)
                  ? "var(--color-primary)"
                  : "var(--color-primary-800)",
                WebkitMaskImage: `url(${item.icon})`,
                maskImage: `url(${item.icon})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
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
