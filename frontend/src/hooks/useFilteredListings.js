import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { listings } from "../data/listings";

export function useFilteredListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();

  const filters = useMemo(
    () => ({
      query: searchParams.get("query") || "",
      location: searchParams.get("location") || "",
      type: searchParams.get("type") || "",
      status: searchParams.get("status") || "",
      bedrooms: searchParams.get("beds") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "newest",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParamsString]
  );

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  const filteredListings = useMemo(() => {
    let result = listings.filter((item) => {
      if (filters.location && item.location !== filters.location) return false;
      if (filters.type && item.type !== filters.type) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (filters.bedrooms && item.bedrooms < Number(filters.bedrooms)) return false;
      if (filters.minPrice && item.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && item.price > Number(filters.maxPrice)) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.location.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    switch (filters.sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return { filters, updateFilter, clearFilters, filteredListings };
}
