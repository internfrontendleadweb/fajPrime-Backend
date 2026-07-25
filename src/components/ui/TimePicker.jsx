import { forwardRef } from "react";
import { Clock } from "lucide-react";

const TimePicker = forwardRef(function TimePicker(
  { label, error, className = "", containerClassName = "", ...rest },
  ref
) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-small font-medium text-navy-800 mb-2">{label}</label>
      )}
      <div className="relative">
        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          ref={ref}
          type="time"
          className={`w-full rounded border bg-white pl-11 pr-4 py-3.5 text-body text-navy-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
            error ? "border-error" : "border-slate-200 focus:border-gold-500"
          } ${className}`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1.5 text-[13px] text-error">{error}</p>}
    </div>
  );
});

export default TimePicker;
