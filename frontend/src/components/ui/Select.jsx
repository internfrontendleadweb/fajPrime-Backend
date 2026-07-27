import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(function Select(
  { label, error, options = [], placeholder = "Select...", className = "", containerClassName = "", ...rest },
  ref
) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-small font-medium text-navy-800 mb-2">{label}</label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`w-full appearance-none rounded border bg-white px-4 py-3.5 pr-10 text-body text-navy-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
            error ? "border-error" : "border-slate-200 focus:border-gold-500"
          } ${className}`}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={typeof opt === "string" ? opt : opt.value} value={typeof opt === "string" ? opt : opt.value}>
              {typeof opt === "string" ? opt : opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1.5 text-[13px] text-error">{error}</p>}
    </div>
  );
});

export default Select;
