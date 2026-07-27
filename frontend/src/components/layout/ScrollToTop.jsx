import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Preserve scroll position when only query params change (e.g. listing filters/pagination)
    const isSamePathDifferentQuery = window.__lastPathname === pathname;
    window.__lastPathname = pathname;
    if (!isSamePathDifferentQuery) {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  }, [pathname, search]);

  return null;
}
