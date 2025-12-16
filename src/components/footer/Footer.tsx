import { ReactNode } from "react";
import { FaHeart } from "react-icons/fa";

interface FooterProps {
  title?: string;
  children?: ReactNode;
  showLinks?: boolean;
}

const Footer = ({
  title = "Elix",
  children,
  showLinks = true,
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Custom children or default content */}
        {children ? (
          children
        ) : (
          <div className="flex flex-col gap-6">
            {/* Logo et titre */}
            <div className="flex items-center justify-center gap-2">
              <FaHeart className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>

            {/* Navigation links */}
            {showLinks && (
              <nav className="flex justify-center">
                <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      Mentions légales
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      RGPD
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      Qui sommes-nous ?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      Le projet Elix
                    </a>
                  </li>
                </ul>
              </nav>
            )}

            {/* Copyright */}
            <p className="text-center text-sm text-gray-500">
              © {currentYear} Elix - Éducation sexuelle pour les jeunes
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
