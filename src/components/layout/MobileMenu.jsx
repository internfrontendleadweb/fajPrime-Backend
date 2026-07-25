import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Phone, Mail } from "lucide-react";
import Logo from "./Logo.jsx";
import { mainNav } from "../../constants/navigation.js";
import { siteConfig } from "../../constants/siteConfig.js";

export default function MobileMenu({ open, onClose }) {
  // Lock body scroll while the menu is open so touch scroll doesn't fight
  // between the fixed overlay and the page behind it.
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[60] bg-navy-900 lg:hidden overflow-y-auto transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ WebkitOverflowScrolling: "touch" }}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between container-custom py-5 sticky top-0 bg-navy-900 z-10">
        <Logo variant="white" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="text-white p-2 -mr-2"
          style={{ touchAction: "manipulation" }}
        >
          <X size={26} />
        </button>
      </div>

      <nav className="container-custom flex flex-col gap-1 mt-2">
        {mainNav.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="block py-3.5 text-h4 font-serif text-white border-b border-white/10 active:text-gold-400 transition-colors"
            style={{ touchAction: "manipulation" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="container-custom mt-8 pb-12 space-y-3">
        <Link
          to="/site-inspection"
          onClick={onClose}
          className="btn-primary w-full justify-center"
          style={{ touchAction: "manipulation" }}
        >
          Book Site Inspection
        </Link>
        <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-white/80 text-small py-2">
          <Phone size={16} /> {siteConfig.phone}
        </a>
        <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-white/80 text-small py-2">
          <Mail size={16} /> {siteConfig.email}
        </a>
      </div>
    </div>
  );
}
