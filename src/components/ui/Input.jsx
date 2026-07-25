import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, icon: Icon, className = "", containerClassName = "", ...rest },
  ref
) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-small font-medium text-navy-800 mb-2">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          ref={ref}
          className={`w-full rounded border bg-white px-4 py-3.5 text-body text-navy-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
            Icon ? "pl-11" : ""
          } ${error ? "border-error" : "border-slate-200 focus:border-gold-500"} ${className}`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1.5 text-[13px] text-error">{error}</p>}
    </div>
  );
});

export default Input;
