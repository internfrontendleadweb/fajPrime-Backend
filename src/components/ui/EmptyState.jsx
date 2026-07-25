import { SearchX } from "lucide-react";
import Button from "./Button.jsx";

export default function EmptyState({
  icon: Icon = SearchX,
  title = "Nothing here yet",
  description = "Try adjusting your filters or check back later.",
  actionLabel,
  actionTo,
  onAction,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center text-center py-20 px-6 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center mb-6">
        <Icon size={28} />
      </div>
      <p className="font-serif text-h3 text-navy-900 mb-2">{title}</p>
      <p className="text-slate-500 text-body max-w-sm mb-6">{description}</p>
      {actionLabel && (
        <Button variant="secondary" to={actionTo} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
