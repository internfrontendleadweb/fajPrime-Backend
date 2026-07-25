import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb.jsx";

export default function PagePlaceholder({ title, breadcrumbLabel, description }) {
  return (
    <>
      <Helmet>
        <title>{title} | FAJ Prime Estates</title>
        <meta name="description" content={description} />
      </Helmet>

      <section className="bg-gradient-navy pt-40 pb-20">
        <div className="container-custom">
          <Breadcrumb items={[{ label: breadcrumbLabel }]} />
          <h1 className="font-serif text-h1 md:text-h1-lg text-white mt-6">{title}</h1>
          <p className="text-white/60 text-body-lg mt-4 max-w-xl">{description}</p>
        </div>
      </section>

      <section className="container-custom py-24 text-center">
        <p className="eyebrow mb-3">Under construction</p>
        <p className="font-serif text-h3 text-navy-900">This page is being built in an upcoming step.</p>
      </section>
    </>
  );
}
