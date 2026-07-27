import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "./Logo.jsx";
import NewsletterSignup from "../sections/NewsletterSignup.jsx";
import MapEmbed from "../sections/MapEmbed.jsx";
import { footerLinks } from "../../constants/navigation.js";
import { siteConfig } from "../../constants/siteConfig.js";

const socialIcons = [
  { Icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { Icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 pt-20 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          <div>
            <Logo variant="white" />
            <p className="text-white/60 text-small mt-5 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-3 mt-6">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-navy-900 hover:bg-gold-500 hover:border-gold-500 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-white/50 mb-5">Quick Links</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-small text-white/70 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/listings" className="text-small text-white/70 hover:text-gold-400 transition-colors">
                  Listings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/50 mb-5">Our Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-small text-white/70 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/50 mb-5">Get In Touch</p>
            <ul className="space-y-3 text-small text-white/70">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 text-gold-400 flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold-400 transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-400 transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 text-gold-400 flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 text-gold-400 flex-shrink-0" />
                <span>{siteConfig.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-14 border-b border-white/10">
          <NewsletterSignup variant="dark" />
          <MapEmbed height="200px" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-small text-white/40">
          <p>© {new Date().getFullYear()} FAJ Prime Estates Ltd. All rights reserved.</p>
          <p className="italic font-serif text-gold-400/80">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
