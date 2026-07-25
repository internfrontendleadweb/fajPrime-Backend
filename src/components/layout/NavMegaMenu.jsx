import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const CLOSE_DELAY = 180;

export default function NavMegaMenu({ label, path, items, transparent, icon: LabelIcon }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapperRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const handleOpen = () => {
    clearCloseTimer();
    setOpen(true);
  };

  // Safety nets: close on outside click, Escape, or page scroll so the panel
  // can never get stuck open regardless of how the pointer leaves.
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e) => e.key === "Escape" && setOpen(false);
    const handleScroll = () => setOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <NavLink
        to={path}
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-1 px-4 py-2 text-small font-medium rounded transition-colors ${
            transparent ? "text-white/90 hover:text-white" : "text-navy-800 hover:text-gold-600"
          } ${isActive ? (transparent ? "text-gold-300" : "text-gold-600") : ""}`
        }
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </NavLink>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80"
          >
            <div className="bg-white rounded-lg shadow-elevated border border-slate-100 overflow-hidden">
              <div className="px-5 pt-5 pb-3 flex items-center gap-2.5 border-b border-slate-100">
                {LabelIcon && (
                  <span className="w-8 h-8 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center">
                    <LabelIcon size={15} />
                  </span>
                )}
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
              </div>

              <div className="p-2">
                {items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between px-3.5 py-2.5 rounded text-small text-navy-800 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                  >
                    {item.label}
                    <ArrowRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </Link>
                ))}
              </div>

              <Link
                to={path}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-5 py-3.5 text-small font-semibold text-navy-900 bg-surface-light hover:bg-gold-50 hover:text-gold-700 transition-colors"
              >
                View all {label.toLowerCase()}
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
