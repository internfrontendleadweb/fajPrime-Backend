import { Helmet } from "react-helmet-async";
import { HomeHero } from "../components/sections/Hero.jsx";
import AboutPreview from "../components/sections/AboutPreview.jsx";
import FeaturedListingsSlider from "../components/sections/FeaturedListingsSlider.jsx";
import ProjectsPreview from "../components/sections/ProjectsPreview.jsx";
import ServicesPreview from "../components/sections/ServicesPreview.jsx";
import SiteInspectionCTA from "../components/sections/SiteInspectionCTA.jsx";
import LatestBlog from "../components/sections/LatestBlog.jsx";
import TestimonialsCarousel from "../components/sections/TestimonialsCarousel.jsx";
import PartnersCarousel from "../components/sections/PartnersCarousel.jsx";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FAJ Prime Estates | Luxury Real Estate in Nigeria</title>
        <meta
          name="description"
          content="FAJ Prime Estates Ltd. delivers premium property development, sales, investment and management across Lekki, Ikoyi, Victoria Island, Abuja and Port Harcourt. Building trust. Delivering value. Creating legacies."
        />
        <meta name="keywords" content="FAJ Prime, luxury real estate Nigeria, Lekki properties, Ikoyi duplex, Victoria Island apartments, Abuja real estate" />
        <meta property="og:title" content="FAJ Prime Estates | Luxury Real Estate in Nigeria" />
        <meta property="og:description" content="Building Trust. Delivering Value. Creating Legacies." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HomeHero />
      <AboutPreview />
      <FeaturedListingsSlider />
      <ProjectsPreview />
      <ServicesPreview />
      <SiteInspectionCTA />
      <LatestBlog />
      <TestimonialsCarousel />
      <PartnersCarousel />
    </>
  );
}
