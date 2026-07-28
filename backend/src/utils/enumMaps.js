// The frontend's existing components (Badge.jsx etc.) do exact string
// matching against values like "For Sale", "Duplex", "past" — not
// SCREAMING_SNAKE_CASE enum values. This file is the one place that
// translates between our clean database enums and those display
// strings, so every controller can stay simple.

export const listingTypeMap = {
  APARTMENT: "Apartment",
  DUPLEX: "Duplex",
  TERRACE: "Terrace",
  LAND: "Land",
  COMMERCIAL: "Commercial",
};
export const listingTypeReverse = invert(listingTypeMap);

export const listingStatusMap = {
  FOR_SALE: "For Sale",
  FOR_RENT: "For Rent",
  OFF_PLAN: "Off-Plan",
  SOLD: "Sold",
  RENTED: "Rented",
};
export const listingStatusReverse = invert(listingStatusMap);

export const projectStatusMap = {
  PAST: "past",
  CURRENT: "current",
  FUTURE: "future",
};
export const projectStatusReverse = invert(projectStatusMap);

export const teamGroupMap = {
  BOARD: "board",
  MANAGEMENT: "management",
};
export const teamGroupReverse = invert(teamGroupMap);

function invert(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
}

// Case-insensitive lookup helper — query params from a URL or a form
// submission can arrive in any casing ("duplex", "Duplex", "DUPLEX").
export function toEnum(reverseMap, displayValue) {
  if (!displayValue) return undefined;
  const match = Object.keys(reverseMap).find(
    (key) => key.toLowerCase() === String(displayValue).toLowerCase()
  );
  return match ? reverseMap[match] : undefined;
}
