import { useState } from "react";
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? url || window.location.href : url;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, ignore silently
    }
  };

  const links = [
    { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}` },
    { Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-slate-400 mr-1">Share:</span>
      {links.map(({ Icon, href }, i) => (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:border-gold-400 hover:text-gold-600 transition-colors"
        >
          <Icon size={15} />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="w-9 h-9 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:border-gold-400 hover:text-gold-600 transition-colors"
      >
        {copied ? <Check size={15} className="text-gold-600" /> : <Link2 size={15} />}
      </button>
    </div>
  );
}
