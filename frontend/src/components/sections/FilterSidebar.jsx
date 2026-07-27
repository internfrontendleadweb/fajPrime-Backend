import { SlidersHorizontal, X } from "lucide-react";
import Select from "../ui/Select.jsx";
import Input from "../ui/Input.jsx";
import RadioGroup from "../ui/RadioGroup.jsx";
import Button from "../ui/Button.jsx";
import { locations, propertyTypes, propertyStatuses } from "../../constants/locations.js";

export default function FilterSidebar({ filters, updateFilter, clearFilters, className = "" }) {
  return (
    <aside className={`bg-white rounded-lg border border-slate-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <p className="flex items-center gap-2 font-serif text-h4 text-navy-900">
          <SlidersHorizontal size={18} className="text-gold-500" /> Filters
        </p>
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-[13px] text-slate-400 hover:text-gold-600 transition-colors"
        >
          <X size={14} /> Clear
        </button>
      </div>

      <div className="space-y-6">
        <Select
          label="Location"
          placeholder="All Locations"
          options={locations}
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
        />

        <Select
          label="Property Type"
          placeholder="All Types"
          options={propertyTypes}
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
        />

        <div>
          <label className="block text-small font-medium text-navy-800 mb-2">Status</label>
          <RadioGroup
            options={propertyStatuses}
            value={filters.status}
            onChange={(val) => updateFilter("status", val === filters.status ? "" : val)}
          />
        </div>

        <div>
          <label className="block text-small font-medium text-navy-800 mb-2">Bedrooms (min)</label>
          <RadioGroup
            options={["1", "2", "3", "4", "5+"]}
            value={filters.bedrooms}
            onChange={(val) =>
              updateFilter("bedrooms", (val === "5+" ? "5" : val) === filters.bedrooms ? "" : val === "5+" ? "5" : val)
            }
          />
        </div>

        <div>
          <label className="block text-small font-medium text-navy-800 mb-2">Price Range (₦)</label>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
            />
            <span className="text-slate-300">–</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <Button variant="primary" className="w-full justify-center" onClick={() => {}}>
          Apply Filters
        </Button>
      </div>
    </aside>
  );
}
