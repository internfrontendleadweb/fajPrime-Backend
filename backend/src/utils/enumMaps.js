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

export function toEnum(reverseMap, displayValue) {
  if (!displayValue) return undefined;
  const match = Object.keys(reverseMap).find(
    (key) => key.toLowerCase() === String(displayValue).toLowerCase(),
  );
  return match ? reverseMap[match] : undefined;
}
