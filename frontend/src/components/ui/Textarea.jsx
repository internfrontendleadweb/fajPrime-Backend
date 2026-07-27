import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  { label, error, rows = 5, className = "", containerClassName = "", ...rest },
  ref
) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-small font-medium text-navy-800 mb-2">{label}</label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full rounded border bg-white px-4 py-3.5 text-body text-navy-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none ${
          error ? "border-error" : "border-slate-200 focus:border-gold-500"
        } ${className}`}
        {...rest}
      />
      {error && <p className="mt-1.5 text-[13px] text-error">{error}</p>}
    </div>
  );
});

export default Textarea;
