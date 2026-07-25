export default function PartnerLogo({ partner }) {
  return (
    <div className="flex items-center justify-center h-20 px-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        className="max-h-10 max-w-[140px] object-contain"
      />
    </div>
  );
}
