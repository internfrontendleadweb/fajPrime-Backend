import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { api } from "../../services/api.js";

export default function NewsletterSignup({ variant = "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const isDark = variant === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await api.subscribeNewsletter(email);
    setStatus("success");
    setEmail("");
  };

  return (
    <div>
      <p className={`font-serif text-h4 mb-2 ${isDark ? "text-white" : "text-navy-900"}`}>
        Stay in the know
      </p>
      <p className={`text-small mb-4 ${isDark ? "text-white/60" : "text-slate-500"}`}>
        Get new listings, market insights and project updates in your inbox.
      </p>

      {status === "success" ? (
        <div className={`flex items-center gap-2 text-small ${isDark ? "text-gold-300" : "text-gold-600"}`}>
          <CheckCircle2 size={18} /> Subscribed. Thank you.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className={`flex-1 min-w-0 px-4 py-3 rounded text-small focus:outline-none focus:ring-2 focus:ring-gold-500 ${
              isDark
                ? "bg-white/10 text-white placeholder:text-white/40 border border-white/15"
                : "bg-white text-navy-900 placeholder:text-slate-400 border border-slate-200"
            }`}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            aria-label="Subscribe"
            className="flex-shrink-0 bg-gold-500 hover:bg-gold-600 text-navy-900 p-3 rounded transition-colors disabled:opacity-60"
          >
            <Send size={18} />
          </button>
        </form>
      )}
    </div>
  );
}
