import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import ContactForm from "../components/sections/ContactForm.jsx";
import MapEmbed from "../components/sections/MapEmbed.jsx";
import FAQAccordion from "../components/sections/FAQAccordion.jsx";
import { siteConfig } from "../constants/siteConfig.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

const contactCards = [
  { icon: Phone, label: "Call Us", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: "Email Us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Visit Our Office", value: siteConfig.address, href: null },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: siteConfig.whatsapp },
];

const socialIcons = [
  { Icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { Icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
];

const faqs = [
  { q: "What are your office hours?", a: `We're open ${siteConfig.workingHours}. WhatsApp messages are monitored outside these hours too.` },
  { q: "Do you have offices outside Lagos?", a: "Yes, we have regional representatives in Abuja and Port Harcourt. Contact us to be connected with the right agent." },
  { q: "How quickly will I get a response?", a: "We aim to respond to all inquiries within 24 hours, often sooner during business hours." },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | FAJ Prime Estates</title>
        <meta
          name="description"
          content="Get in touch with FAJ Prime Estates Ltd. Call, email, WhatsApp or visit our Victoria Island office."
        />
      </Helmet>

      <InnerHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out through any channel below."
        breadcrumbItems={[{ label: "Contact" }]}
        backgroundImage="/images/hero/contact-hero.jpg"
      />

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="container-custom -mt-24 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {contactCards.map((card) => {
              const Wrapper = card.href ? "a" : "div";
              return (
                <motion.div key={card.label} variants={fadeInUp}>
                  <Wrapper
                    href={card.href}
                    target={card.href?.startsWith("http") ? "_blank" : undefined}
                    rel={card.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block bg-white rounded-lg shadow-elevated p-6 text-center hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto mb-4">
                      <card.icon size={20} />
                    </div>
                    <p className="text-[13px] text-slate-400 mb-1">{card.label}</p>
                    <p className="font-semibold text-small text-navy-900">{card.value}</p>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="pb-section-lg bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="eyebrow mb-4">Send a Message</p>
            <h2 className="font-serif text-h2 text-navy-900 mb-6">Get in touch</h2>
            <ContactForm />
          </div>

          <div>
            <MapEmbed height="360px" className="mb-8" />

            <div className="bg-surface-light rounded-lg p-6">
              <p className="flex items-center gap-2 font-serif text-h4 text-navy-900 mb-4">
                <Clock size={18} className="text-gold-500" /> Working Hours
              </p>
              <p className="text-small text-slate-600 mb-6">{siteConfig.workingHours}</p>

              <p className="eyebrow mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socialIcons.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-navy-800 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-navy-900 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} eyebrow="Questions" title="Frequently Asked Questions" />
    </>
  );
}
