import { motion } from "framer-motion";
import Breadcrumb from "../layout/Breadcrumb.jsx";
import SearchPropertyBar from "./SearchPropertyBar.jsx";
import StatCard from "../cards/StatCard.jsx";
import HeroMedia from "./HeroMedia.jsx";
import { siteConfig } from "../../constants/siteConfig.js";
import { Building2, Users, Home as HomeIcon, Award } from "lucide-react";
import { fadeInUp, staggerContainer } from "../../animations/variants.js";

const heroStats = [
  { icon: HomeIcon, value: "500+", label: "Properties Delivered" },
  { icon: Building2, value: "12+", label: "Active Developments" },
  { icon: Users, value: "1,200+", label: "Happy Clients" },
  { icon: Award, value: "8+", label: "Years of Excellence" },
];

export function HomeHero({ videoSrc, posterImage, images }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-60">
          <HeroMedia
            videoSrc={videoSrc}
            posterImage={posterImage}
            images={images}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/30" />
      </div>

      {/* Ambient animated shapes */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-500/5 blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10 pt-32 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15)}
          className="max-w-3xl"
        >
          <motion.p variants={fadeInUp} className="eyebrow text-gold-400 mb-6">
            {siteConfig.secondaryTagline}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-h1 md:text-h1-lg text-white leading-tight"
          >
            Building Exceptional Spaces.
            <br />
            Creating Lasting Value.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-white/70 mt-6 max-w-xl"
          >
            A forward-thinking real estate company delivering premium property
            solutions that inspire comfortable living, profitable investments
            and lasting value across Nigeria.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a href="/listings" className="btn-primary">
              View Listings
            </a>
            <a href="/site-inspection" className="btn-ghost">
              Book Site Inspection
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14"
        >
          <SearchPropertyBar />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1, 0.7)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
        >
          {heroStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <StatCard {...stat} glass />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function InnerHero({
  title,
  subtitle,
  breadcrumbItems = [],
  backgroundImage,
}) {
  return (
    <section className="relative bg-navy-900 pt-40 pb-20 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-navy opacity-90" />
        </div>
      )}
      <div className="container-custom relative z-10">
        <Breadcrumb items={breadcrumbItems} />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-h1 md:text-h1-lg text-white mt-6"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="text-white/60 text-body-lg mt-4 max-w-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
