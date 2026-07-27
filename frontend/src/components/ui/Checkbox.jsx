import { forwardRef } from "react";
import { Check } from "lucide-react";

const Checkbox = forwardRef(function Checkbox({ label, className = "", ...rest }, ref) {
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer select-none group ${className}`}>
      <span className="relative flex-shrink-0 w-5 h-5">
        <input ref={ref} type="checkbox" className="peer sr-only" {...rest} />
        <span className="absolute inset-0 rounded border-2 border-slate-300 bg-white transition-colors peer-checked:bg-gold-500 peer-checked:border-gold-500 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-500/40" />
        <Check
          size={14}
          strokeWidth={3}
          className="absolute inset-0 m-auto text-navy-900 opacity-0 peer-checked:opacity-100 pointer-events-none"
        />
      </span>
      {label && <span className="text-small text-slate-700">{label}</span>}
    </label>
  );
});

export default Checkbox;
