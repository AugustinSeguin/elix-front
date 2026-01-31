import { ReactNode } from "react";
import { FaBars } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: "var(--color-primary-500)",
        borderBottomColor: "var(--color-primary-600)",
      }}
      className={`shadow-md border-b ${sticky ? "sticky top-0 z-50" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 min-h-[60px]">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="p-2 w-10 h-10 !rounded-full border border-black/20 hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
              aria-label="Retour"
            >
              <MdArrowBackIosNew className="w-5 h-5 text-black" />
            </Button>

            {/* Menu icon */}
            {onMenuClick && (
              <Button
                onClick={onMenuClick}
                variant="ghost"
                size="sm"
                className="p-2 rounded-lg hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-label="Menu"
              >
                <FaBars className="w-6 h-6 text-gray-700" />
              </Button>
            )}
          </div>

          {/* Title */}
          {title && (
            <h1 className="text-xl font-bold text-black text-center flex-1 px-2 leading-tight">
              {title}
            </h1>
          )}

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
