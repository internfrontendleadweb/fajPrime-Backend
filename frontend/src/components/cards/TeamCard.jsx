import { Linkedin } from "lucide-react";

export default function TeamCard({ member }) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-navy-900 aspect-[3/4]">
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-serif text-h4 text-white mb-1">{member.name}</p>
        <p className="text-small text-gold-400 mb-3">{member.role}</p>

        <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-400 ease-out-soft">
          <p className="text-[13px] text-white/70 leading-relaxed mb-4">{member.bio}</p>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="inline-flex w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 text-white items-center justify-center transition-colors"
          >
            <Linkedin size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
