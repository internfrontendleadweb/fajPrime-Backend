const variantStyles = {
  gold: { mark: "#D4AF37", word: "#0D1B2A", sub: "#5C6570" },
  white: { mark: "#D4AF37", word: "#FFFFFF", sub: "#E4C66C" },
};

export default function Logo({ variant = "gold", showWordmark = true, className = "" }) {
  const c = variantStyles[variant];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M24 3L44 15V33C44 40 35 45 24 45C13 45 4 40 4 33V15L24 3Z"
          stroke={c.mark}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16 21H32M16 21V30M16 21L20 17M32 21V30M32 21L28 17M20 30V25H28V30"
          stroke={c.mark}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <div className="leading-none">
          <p
            className="font-serif font-bold text-lg tracking-wide"
            style={{ color: c.word }}
          >
            FAJ PRIME
          </p>
          <p
            className="font-sans text-[10px] uppercase tracking-[0.25em] mt-0.5"
            style={{ color: c.sub }}
          >
            Estates Ltd.
          </p>
        </div>
      )}
    </div>
  );
}
