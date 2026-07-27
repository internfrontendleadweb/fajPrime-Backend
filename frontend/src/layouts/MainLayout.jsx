import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import BackToTop from "../components/layout/BackToTop.jsx";
import PageTransition from "../components/layout/PageTransition.jsx";
import ScrollToTop from "../components/layout/ScrollToTop.jsx";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
