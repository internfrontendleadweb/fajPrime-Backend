import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, FolderKanban, Wrench } from "lucide-react";
import Logo from "./Logo.jsx";
import MobileMenu from "./MobileMenu.jsx";
import NavMegaMenu from "./NavMegaMenu.jsx";
import { mainNav } from "../../constants/navigation.js";
import { useScrollPosition } from "../../hooks/useScrollPosition.js";

const projectItems = [
  { label: "Current Projects", to: "/projects?status=current" },
  { label: "Past Projects", to: "/projects?status=past" },
  { label: "Future Projects", to: "/projects?status=future" },
];

const serviceItems = [
  { label: "Property Development", to: "/services/property-development" },
  { label: "Property Sales", to: "/services/property-sales" },
  { label: "Property Management", to: "/services/property-management" },
  { label: "Investment Advisory", to: "/services/investment-advisory" },
  { label: "Land Sales", to: "/services/land-sales" },
  { label: "Construction", to: "/services/construction" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPosition(40);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-soft ${
          transparent
            ? "bg-transparent py-5"
            : "bg-white/95 backdrop-blur-md shadow-soft py-3"
        }`}
      >
        <nav className="container-custom flex items-center justify-between">
          <Link to="/" aria-label="FAJ Prime Estates home">
            <Logo variant={transparent ? "white" : "gold"} />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => {
              if (item.label === "Projects") {
                return (
                  <NavMegaMenu
                    key={item.path}
                    label="Projects"
                    path="/projects"
                    items={projectItems}
                    transparent={transparent}
                    icon={FolderKanban}
                  />
                );
              }
              if (item.label === "Services") {
                return (
                  <NavMegaMenu
                    key={item.path}
                    label="Services"
                    path="/services"
                    items={serviceItems}
                    transparent={transparent}
                    icon={Wrench}
                  />
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-small font-medium rounded transition-colors ${
                      transparent
                        ? "text-white/90 hover:text-white"
                        : "text-navy-800 hover:text-gold-600"
                    } ${isActive ? (transparent ? "text-gold-300" : "text-gold-600") : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/site-inspection"
              className="btn-primary !py-3 !px-6 text-small"
            >
              Book Inspection
            </Link>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden p-2 rounded transition-colors ${
              transparent ? "text-white" : "text-navy-900"
            }`}
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
