import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | FAJ Prime Estates</title>
      </Helmet>
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center container-custom pt-32">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-serif text-h1 text-navy-900 mb-4">Page not found</h1>
        <p className="text-slate-500 text-body-lg mb-8 max-w-md">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn-primary">
          <Home size={18} /> Back to Home
        </Link>
      </section>
    </>
  );
}
