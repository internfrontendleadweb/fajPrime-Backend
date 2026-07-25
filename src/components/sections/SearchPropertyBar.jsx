import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { locations, propertyTypes } from "../../constants/locations.js";

export default function SearchPropertyBar({ compact = false }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-lg shadow-elevated p-3 flex flex-col md:flex-row gap-3 ${
        compact ? "max-w-3xl" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
        <Search size={18} className="text-slate-400 flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by property name or location"
          className="w-full text-small text-navy-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100 md:w-56">
        <MapPin size={18} className="text-slate-400 flex-shrink-0" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-small text-navy-900 bg-transparent focus:outline-none"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 md:w-48">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full text-small text-navy-900 bg-transparent focus:outline-none"
        >
          <option value="">Property Type</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary flex-shrink-0 justify-center">
        Search
      </button>
    </form>
  );
}
