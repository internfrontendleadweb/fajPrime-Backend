export default function Divider({ variant = "line", className = "" }) {
  if (variant === "accent") {
    return <div className={`w-16 h-[3px] bg-gold-500 rounded-full ${className}`} />;
  }

  return <div className={`w-full h-px bg-slate-200 ${className}`} />;
}
