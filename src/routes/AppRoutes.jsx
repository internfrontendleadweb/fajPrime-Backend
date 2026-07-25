import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import PageLoader from "../components/ui/PageLoader.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const WhyUs = lazy(() => import("../pages/WhyUs.jsx"));
const Projects = lazy(() => import("../pages/Projects.jsx"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails.jsx"));
const Services = lazy(() => import("../pages/Services.jsx"));
const ServiceDetails = lazy(() => import("../pages/ServiceDetails.jsx"));
const Listings = lazy(() => import("../pages/Listings.jsx"));
const PropertyDetails = lazy(() => import("../pages/PropertyDetails.jsx"));
const Team = lazy(() => import("../pages/Team.jsx"));
const Blog = lazy(() => import("../pages/Blog.jsx"));
const BlogDetails = lazy(() => import("../pages/BlogDetails.jsx"));
const SiteInspection = lazy(() => import("../pages/SiteInspection.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const Favorites = lazy(() => import("../pages/Favorites.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-us" element={<WhyUs />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />

          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:slug" element={<PropertyDetails />} />

          <Route path="/team" element={<Team />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          <Route path="/site-inspection" element={<SiteInspection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
