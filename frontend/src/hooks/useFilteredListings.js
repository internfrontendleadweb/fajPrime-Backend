import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api.js";

export function useFilteredListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Filtering (location, type, status, bedrooms, price range, search)
  // now happens server-side in the API. Sort stays client-side since
  // the backend doesn't support a sort param yet.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .getListings({
        location: filters.location,
        type: filters.type,
        status: filters.status,
        bedrooms: filters.bedrooms,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        query: filters.query,
      })
      .then((data) => {
        if (cancelled) return;
        setListings(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setListings([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.location,
    filters.type,
    filters.status,
    filters.bedrooms,
    filters.minPrice,
    filters.maxPrice,
    filters.query,
  ]);

  const filteredListings = useMemo(() => {
    let result = listings;
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
  }, [listings, filters.sort]);

  return { filters, updateFilter, clearFilters, filteredListings, loading, error };
}
