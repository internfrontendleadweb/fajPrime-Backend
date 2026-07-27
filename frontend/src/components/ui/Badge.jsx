const statusStyles = {
  "For Sale": "bg-gold-500 text-navy-900",
  "For Rent": "bg-navy-800 text-white",
  "Sold": "bg-slate-400 text-white",
  "Off-Plan": "bg-white text-navy-900 border border-gold-500",
  default: "bg-gold-500 text-navy-900",
};

export default function Badge({ children, status, className = "" }) {
  const style = statusStyles[status] || statusStyles.default;

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${style} ${className}`}
    >
      {children || status}
    </span>
  );
}
