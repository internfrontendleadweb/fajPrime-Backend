export default function RadioGroup({ name, options = [], value, onChange, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {options.map((opt) => {
        const optValue = typeof opt === "string" ? opt : opt.value;
        const optLabel = typeof opt === "string" ? opt : opt.label;
        const active = value === optValue;

        return (
          <button
            key={optValue}
            type="button"
            onClick={() => onChange(optValue)}
            className={`px-5 py-2.5 rounded-full text-small font-medium border transition-colors ${
              active
                ? "bg-gold-500 border-gold-500 text-navy-900"
                : "bg-white border-slate-200 text-slate-600 hover:border-gold-300"
            }`}
          >
            {optLabel}
          </button>
        );
      })}
    </div>
  );
}
