import { motion } from "framer-motion";

export default function Tabs({ tabs = [], active, onChange, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-1 p-1.5 bg-slate-100 rounded-full ${className}`}>
      {tabs.map((tab) => {
        const value = typeof tab === "string" ? tab : tab.value;
        const label = typeof tab === "string" ? tab : tab.label;
        const isActive = active === value;

        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className="relative px-6 py-2.5 text-small font-medium rounded-full transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="tabActiveBg"
                className="absolute inset-0 bg-navy-900 rounded-full"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-500"}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
