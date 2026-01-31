import { ReactNode } from "react";
import { FaBars } from "react-icons/fa";
import Button from "../button/Button";

interface HeaderProps {
  title?: string;
  children?: ReactNode;
  sticky?: boolean;
  onMenuClick?: () => void;
}

const Header = ({
  title,
  children,
  sticky = true,
  onMenuClick,
}: HeaderProps) => {
  return (
    <header
      className={`
        bg-white shadow-md border-b border-gray-200
        ${sticky ? "sticky top-0 z-50" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Menu icon */}
          {onMenuClick && (
            <Button
              onClick={onMenuClick}
              variant="ghost"
              size="sm"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Menu"
            >
              <FaBars className="w-6 h-6 text-gray-700" />
            </Button>
          )}

          {/* Title */}
          {title && <h1 className="text-xl font-bold text-primary">{title}</h1>}

          {/* Custom children */}
          {children && (
            <div className="flex items-center gap-4">{children}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
