export default function StatCard({ icon: Icon, value, label, glass = true, className = "" }) {
  return (
    <div
      className={`flex items-center gap-4 px-6 py-5 rounded-lg ${
        glass
          ? "bg-white/10 backdrop-blur-md border border-white/20"
          : "bg-white shadow-soft border border-slate-100"
      } ${className}`}
    >
      {Icon && (
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
            glass ? "bg-gold-500/20 text-gold-400" : "bg-gold-50 text-gold-600"
          }`}
        >
          <Icon size={20} />
        </div>
      )}
      <div>
        <p className={`font-serif text-h3 leading-none ${glass ? "text-white" : "text-navy-900"}`}>
          {value}
        </p>
        <p className={`text-small mt-1.5 ${glass ? "text-white/60" : "text-slate-500"}`}>{label}</p>
      </div>
    </div>
  );
}
