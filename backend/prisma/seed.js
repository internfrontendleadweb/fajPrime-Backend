import { prisma } from "../src/config/db.js";
import {
  listingTypeReverse,
  listingStatusReverse,
  projectStatusReverse,
  teamGroupReverse,
} from "../src/utils/enumMaps.js";

const agents = [
  {
    id: "agt-001",
    name: "Chidinma Eze",
    role: "Senior Sales Agent",
    phone: "+234 802 111 2223",
    email: "chidinma@fajprimeestates.com",
  },
  {
    id: "agt-002",
    name: "Tunde Bakare",
    role: "Luxury Homes Specialist",
    phone: "+234 803 222 3334",
    email: "tunde@fajprimeestates.com",
  },
  {
    id: "agt-003",
    name: "Ngozi Umeh",
    role: "Sales Agent",
    phone: "+234 804 333 4445",
    email: "ngozi@fajprimeestates.com",
  },
  {
    id: "agt-004",
    name: "Bola Adeyemi",
    role: "Land & Investment Agent",
    phone: "+234 805 444 5556",
    email: "bola@fajprimeestates.com",
  },
  {
    id: "agt-005",
    name: "Ibrahim Sule",
    role: "Abuja Regional Agent",
    phone: "+234 806 555 6667",
    email: "ibrahim@fajprimeestates.com",
  },
  {
    id: "agt-006",
    name: "Fyneface Amadi",
    role: "Port Harcourt Regional Agent",
    phone: "+234 807 666 7778",
    email: "fyneface@fajprimeestates.com",
  },
];

const listings = [
  {
    id: "lst-001",
    slug: "luxury-5-bedroom-fully-detached-duplex-ikoyi",
    title: "Luxury 5-Bedroom Fully Detached Duplex",
    type: "Duplex",
    status: "For Sale",
    price: 850000000,
    location: "Ikoyi, Lagos",
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    sqm: 620,
    featured: true,
    agent: "agt-002",
    description:
      "An architectural statement in the heart of Ikoyi, this fully detached duplex blends contemporary design with timeless luxury finishes, offering an unmatched living experience for discerning families.",
    amenities: [
      "Swimming Pool",
      "BQ",
      "24/7 Power",
      "Smart Home",
      "Gym",
      "CCTV",
    ],
    images: [
      "/images/properties/ikoyi-duplex-1.webp",
      "/images/properties/ikoyi-duplex-2.webp",
      "/images/properties/ikoyi-duplex-3.webp",
    ],
  },
  {
    id: "lst-002",
    slug: "3-bedroom-luxury-waterfront-apartment-victoria-island",
    title: "3-Bedroom Luxury Waterfront Apartment",
    type: "Apartment",
    status: "For Sale",
    price: 320000000,
    location: "Victoria Island, Lagos",
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    sqm: 210,
    featured: true,
    agent: "agt-001",
    description:
      "Wake up to unobstructed lagoon views in this beautifully appointed waterfront apartment, featuring premium finishes and full concierge service.",
    amenities: [
      "Waterfront View",
      "Concierge",
      "Gym",
      "Elevator",
      "Backup Power",
    ],
    images: [
      "/images/properties/vi-apartment-1.webp",
      "/images/properties/vi-apartment-2.webp",
    ],
  },
  {
    id: "lst-003",
    slug: "4-bedroom-terrace-duplex-lekki-phase-1",
    title: "4-Bedroom Terrace Duplex with BQ",
    type: "Terrace",
    status: "For Sale",
    price: 210000000,
    location: "Lekki, Lagos",
    bedrooms: 4,
    bathrooms: 5,
    parking: 2,
    sqm: 280,
    featured: true,
    agent: "agt-003",
    description:
      "Set within a serene, gated estate in Lekki Phase 1, this modern terrace duplex offers spacious family living with a dedicated staff quarters.",
    amenities: [
      "Estate Security",
      "Children's Play Area",
      "24/7 Power",
      "Parking",
    ],
    images: [
      "/images/properties/lekki-terrace-1.webp",
      "/images/properties/lekki-terrace-2.webp",
    ],
  },
  {
    id: "lst-004",
    slug: "2-bedroom-apartment-ajah",
    title: "2-Bedroom Serviced Apartment",
    type: "Apartment",
    status: "For Rent",
    price: 3500000,
    location: "Ajah, Lagos",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    sqm: 95,
    featured: false,
    agent: "agt-003",
    description:
      "A comfortable, well-serviced apartment ideal for young professionals, located minutes from the Lekki-Epe expressway.",
    amenities: ["Serviced", "24/7 Power", "Water Treatment", "Security"],
    images: [
      "/images/properties/ajah-apartment-1.webp",
      "/images/properties/ajah-apartment-2.webp",
    ],
  },
  {
    id: "lst-005",
    slug: "land-for-sale-ajah",
    title: "Prime Dry Land, 1,000 sqm",
    type: "Land",
    status: "For Sale",
    price: 45000000,
    location: "Ajah, Lagos",
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    sqm: 1000,
    featured: false,
    agent: "agt-004",
    description:
      "Dry, fenced land with governor's consent in a fast-developing corridor of Ajah, offering an excellent entry point for investors.",
    amenities: ["Governor's Consent", "Fenced", "Dry Land"],
    images: ["/images/properties/ajah-land-1.webp"],
  },
  {
    id: "lst-006",
    slug: "6-bedroom-mansion-ikoyi",
    title: "6-Bedroom Contemporary Mansion",
    type: "Duplex",
    status: "For Sale",
    price: 1200000000,
    location: "Ikoyi, Lagos",
    bedrooms: 6,
    bathrooms: 7,
    parking: 6,
    sqm: 850,
    featured: true,
    agent: "agt-002",
    description:
      "A rare, expansive mansion offering cinema room, private elevator, rooftop entertainment deck and staff quarters, representing Ikoyi living at its finest.",
    amenities: [
      "Private Elevator",
      "Cinema Room",
      "Rooftop Deck",
      "Swimming Pool",
      "BQ",
    ],
    images: [
      "/images/properties/ikoyi-mansion-1.webp",
      "/images/properties/ikoyi-mansion-2.webp",
    ],
  },
  {
    id: "lst-007",
    slug: "commercial-office-space-victoria-island",
    title: "Grade-A Commercial Office Floor",
    type: "Commercial",
    status: "For Rent",
    price: 25000000,
    location: "Victoria Island, Lagos",
    bedrooms: 0,
    bathrooms: 4,
    parking: 10,
    sqm: 450,
    featured: false,
    agent: "agt-001",
    description:
      "A full commercial floor in a Grade-A office building, ideal for corporate headquarters, with backup power and dedicated parking.",
    amenities: [
      "24/7 Power",
      "Dedicated Parking",
      "Fiber Internet",
      "Elevator",
    ],
    images: ["/images/properties/vi-office-1.webp"],
  },
  {
    id: "lst-009",
    slug: "4-bedroom-terrace-asokoro-abuja",
    title: "4-Bedroom Luxury Terrace",
    type: "Terrace",
    status: "For Sale",
    price: 310000000,
    location: "Asokoro, Abuja",
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    sqm: 340,
    featured: false,
    agent: "agt-005",
    description:
      "Elegant terrace living within a diplomatic-zone-adjacent estate, finished to an exceptional standard throughout.",
    amenities: ["Estate Security", "Gym", "24/7 Power"],
    images: ["/images/properties/asokoro-terrace-1.webp"],
  },
  {
    id: "lst-010",
    slug: "3-bedroom-apartment-gra-port-harcourt",
    title: "3-Bedroom Modern Apartment",
    type: "Apartment",
    status: "For Sale",
    price: 145000000,
    location: "GRA, Port Harcourt",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    sqm: 180,
    featured: false,
    agent: "agt-006",
    description:
      "A modern apartment in Port Harcourt's premier residential district, offering privacy, security and easy city access.",
    amenities: ["Backup Power", "Security", "Parking"],
    images: ["/images/properties/ph-apartment-1.webp"],
  },
  {
    id: "lst-011",
    slug: "off-plan-luxury-apartments-lekki",
    title: "Off-Plan 3-Bedroom Luxury Apartments",
    type: "Apartment",
    status: "Off-Plan",
    price: 165000000,
    location: "Lekki, Lagos",
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    sqm: 195,
    featured: true,
    agent: "agt-003",
    description:
      "Secure early-bird pricing on this off-plan development featuring resort-style amenities, set for completion in 2027.",
    amenities: ["Swimming Pool", "Gym", "Rooftop Lounge", "Smart Home"],
    images: ["/images/properties/lekki-offplan-1.webp"],
  },
  {
    id: "lst-012",
    slug: "land-for-sale-epe",
    title: "Waterfront Land, 2,000 sqm",
    type: "Land",
    status: "For Sale",
    price: 60000000,
    location: "Lekki, Lagos",
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    sqm: 2000,
    featured: false,
    agent: "agt-004",
    description:
      "Expansive waterfront land parcel ideal for a private estate or boutique development, with clean title documentation.",
    amenities: ["Waterfront", "Governor's Consent"],
    images: ["/images/properties/epe-land-1.webp"],
  },
  {
    id: "lst-013",
    slug: "penthouse-victoria-island",
    title: "4-Bedroom Penthouse with City Views",
    type: "Apartment",
    status: "For Sale",
    price: 620000000,
    location: "Victoria Island, Lagos",
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    sqm: 380,
    featured: true,
    agent: "agt-001",
    description:
      "A statement penthouse offering panoramic Lagos skyline views, private lift access and a wraparound terrace.",
    amenities: ["Private Lift", "Terrace", "Concierge", "Smart Home"],
    images: ["/images/properties/vi-penthouse-1.webp"],
  },
  {
    id: "lst-014",
    slug: "3-bedroom-duplex-ajah",
    title: "3-Bedroom Semi-Detached Duplex",
    type: "Duplex",
    status: "For Sale",
    price: 95000000,
    location: "Ajah, Lagos",
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    sqm: 220,
    featured: false,
    agent: "agt-004",
    description:
      "An affordable entry into duplex living within a secure, family-friendly estate close to major amenities.",
    amenities: ["Estate Security", "24/7 Power", "Parking"],
    images: ["/images/properties/ajah-duplex-1.webp"],
  },
];

const projects = [
  {
    id: "prj-001",
    slug: "faj-gardens-lekki",
    title: "FAJ Gardens",
    status: "past",
    location: "Lekki, Lagos",
    progress: 100,
    completionDate: "Completed, 2022",
    propertyType: "Terrace Duplexes",
    units: 18,
    description:
      "A gated community of 18 contemporary terrace duplexes, fully sold out and delivered on schedule, now a thriving residential enclave.",
    amenities: ["Estate Security", "Children's Park", "Clubhouse"],
    images: ["/images/projects/faj-gardens-1.webp"],
  },
  {
    id: "prj-002",
    slug: "prime-court-ikoyi",
    title: "Prime Court",
    status: "past",
    location: "Ikoyi, Lagos",
    progress: 100,
    completionDate: "Completed, 2021",
    propertyType: "Luxury Apartments",
    units: 12,
    description:
      "A boutique 12-unit luxury apartment building delivered to exacting international finishing standards.",
    amenities: ["Gym", "Concierge", "Rooftop Terrace"],
    images: ["/images/projects/prime-court-1.avif"],
  },
  {
    id: "prj-003",
    slug: "faj-heights-abuja",
    title: "FAJ Heights Abuja",
    status: "past",
    location: "Maitama, Abuja",
    progress: 100,
    completionDate: "Completed, 2023",
    propertyType: "Detached Duplexes",
    units: 10,
    description:
      "Ten fully detached duplexes in Maitama, delivered with premium interior finishing and landscaped grounds.",
    amenities: ["24/7 Power", "Estate Security", "BQ"],
    images: ["/images/projects/faj-heights-abuja-1.webp"],
  },
  {
    id: "prj-004",
    slug: "faj-prime-heights-ikoyi",
    title: "FAJ Prime Heights",
    status: "current",
    location: "Ikoyi, Lagos",
    progress: 65,
    completionDate: "Expected Q3 2027",
    propertyType: "Luxury Apartments",
    units: 24,
    description:
      "A striking 24-unit residential tower under construction in Ikoyi, offering resort-style amenities and panoramic lagoon views.",
    amenities: ["Rooftop Lounge", "Pool", "Gym", "Smart Access"],
    images: ["/images/projects/faj-prime-heights-1.webp"],
  },
  {
    id: "prj-005",
    slug: "lekki-waterview-estate",
    title: "Lekki Waterview Estate",
    status: "current",
    location: "Lekki, Lagos",
    progress: 40,
    completionDate: "Expected Q1 2028",
    propertyType: "Terrace & Semi-Detached Duplexes",
    units: 32,
    description:
      "A 32-unit gated estate currently under construction, offering a mix of terrace and semi-detached duplexes along the Lekki waterfront corridor.",
    amenities: [
      "Waterfront Access",
      "Estate Security",
      "Clubhouse",
      "Children's Park",
    ],
    images: ["/images/projects/lekki-waterview-1.webp"],
  },
  {
    id: "prj-006",
    slug: "asokoro-grand-residences",
    title: "Asokoro Grand Residences",
    status: "current",
    location: "Asokoro, Abuja",
    progress: 55,
    completionDate: "Expected Q4 2027",
    propertyType: "Detached Duplexes",
    units: 8,
    description:
      "An exclusive enclave of 8 grand detached duplexes rising in Asokoro, designed for Abuja's most discerning homeowners.",
    amenities: ["Swimming Pool", "BQ", "24/7 Power", "Security"],
    images: ["/images/projects/asokoro-grand-1.webp"],
  },
  {
    id: "prj-007",
    slug: "vi-marina-towers",
    title: "VI Marina Towers",
    status: "future",
    location: "Victoria Island, Lagos",
    progress: 0,
    completionDate: "Groundbreaking Q1 2027",
    propertyType: "Mixed-Use Towers",
    units: 60,
    description:
      "A landmark mixed-use development planned for Victoria Island, combining luxury residences with premium retail and office space.",
    amenities: ["Retail Podium", "Sky Lounge", "Gym", "Concierge"],
    images: ["/images/projects/vi-marina-towers-1.webp"],
  },
  {
    id: "prj-008",
    slug: "ajah-smart-city",
    title: "Ajah Smart City",
    status: "future",
    location: "Ajah, Lagos",
    progress: 0,
    completionDate: "Groundbreaking Q3 2027",
    propertyType: "Smart Homes Community",
    units: 120,
    description:
      "A planned 120-unit smart-home community in Ajah, designed around sustainability, technology integration and affordable luxury.",
    amenities: [
      "Smart Home Tech",
      "Solar Power",
      "Estate Security",
      "Green Spaces",
    ],
    images: ["/images/projects/ajah-smart-city-1.webp"],
  },
  {
    id: "prj-009",
    slug: "ph-waterfront-residences",
    title: "PH Waterfront Residences",
    status: "future",
    location: "GRA, Port Harcourt",
    progress: 0,
    completionDate: "Groundbreaking Q2 2028",
    propertyType: "Luxury Apartments",
    units: 20,
    description:
      "A planned waterfront residential development in Port Harcourt's GRA, bringing FAJ Prime's signature luxury standard to the region.",
    amenities: ["Waterfront Views", "Gym", "Pool", "Security"],
    images: ["/images/projects/ph-waterfront-1.webp"],
  },
];

const services = [
  {
    id: "svc-01",
    slug: "property-development",
    title: "Property Development",
    icon: "Building2",
    shortDescription:
      "We undertake complete residential developments from planning through construction and delivery, covering everything from land acquisition to final handover.",
    benefits: [
      "Full-cycle project management",
      "Vetted architects and contractors",
      "Transparent milestone reporting",
      "Quality-assured construction standards",
    ],
    process: [
      "Site acquisition & feasibility study",
      "Design & regulatory approvals",
      "Construction & quality control",
      "Handover & after-sales support",
    ],
    faqs: [
      {
        q: "Do you develop on client-owned land?",
        a: "Yes, we offer development management services on land you already own, alongside our own site developments.",
      },
      {
        q: "How long does a typical development take?",
        a: "Timelines vary by scale, but most residential developments take 18-30 months from groundbreaking to handover.",
      },
    ],
  },
  {
    id: "svc-02",
    slug: "property-sales",
    title: "Property Sales",
    icon: "Home",
    shortDescription:
      "We provide premium residential property opportunities tailored to homeowners and investors across Nigeria's most sought-after locations.",
    benefits: [
      "Verified, title-clean properties",
      "Dedicated sales agents",
      "Flexible payment plans",
      "Post-sale support",
      "Access to off-market listings",
      "Negotiation support on your behalf",
    ],
    process: [
      "Consultation and property matching",
      "Site inspection",
      "Documentation and legal review",
      "Closing and handover",
    ],
    faqs: [
      {
        q: "Are your properties title-verified?",
        a: "Every property listed goes through a legal documentation review before it appears on our platform.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes, select properties are available on structured payment plans. Speak with an agent to discuss what suits your budget.",
      },
      {
        q: "Can I negotiate the listed price?",
        a: "In many cases, yes. Our agents represent your interests and help negotiate favorable terms where possible.",
      },
    ],
  },
  {
    id: "svc-03",
    slug: "property-management",
    title: "Property Management",
    icon: "KeyRound",
    shortDescription:
      "Comprehensive management of your property investment, from tenant sourcing to facility maintenance, so you enjoy the returns without the day-to-day demands.",
    benefits: [
      "Tenant sourcing and screening",
      "Rent collection and remittance",
      "Routine maintenance and repairs",
      "Regular performance reporting",
      "24/7 emergency response coordination",
      "Lease renewal and rent review management",
    ],
    process: [
      "Property onboarding and inspection",
      "Marketing and tenant placement",
      "Ongoing management and maintenance",
      "Periodic owner reporting",
    ],
    faqs: [
      {
        q: "What is your management fee?",
        a: "Fees are typically a percentage of annual rental income. Contact us for a tailored quote based on your property.",
      },
      {
        q: "Can you manage properties I didn't buy through FAJ Prime?",
        a: "Absolutely, our management service is open to all qualifying properties regardless of where they were purchased.",
      },
      {
        q: "How often will I receive updates on my property?",
        a: "Owners receive monthly performance reports, with immediate notice for any maintenance issues or tenant changes.",
      },
    ],
  },
  {
    id: "svc-04",
    slug: "investment-advisory",
    title: "Investment Advisory",
    icon: "TrendingUp",
    shortDescription:
      "We create investment opportunities designed for long-term appreciation and sustainable returns, aligned with your financial goals and risk appetite.",
    benefits: [
      "Market analysis and forecasting",
      "Portfolio diversification advice",
      "ROI projections and scenario modeling",
      "Off-plan investment access",
      "Diaspora-friendly remote investing support",
      "Ongoing portfolio performance reviews",
    ],
    process: [
      "Goals and risk assessment",
      "Market opportunity analysis",
      "Investment recommendation",
      "Ongoing portfolio review",
    ],
    faqs: [
      {
        q: "Do you advise foreign or diaspora investors?",
        a: "Yes, a significant part of our client base is diaspora investors. We handle remote transactions regularly, including virtual inspections and secure documentation.",
      },
      {
        q: "What's the minimum investment?",
        a: "This varies by opportunity. Our land and off-plan options tend to offer the most accessible entry points.",
      },
      {
        q: "How do you measure investment performance?",
        a: "We track appreciation, rental yield and market comparables, and share this with you through regular portfolio reviews.",
      },
    ],
  },
  {
    id: "svc-05",
    slug: "land-sales",
    title: "Land Sales",
    icon: "MapPin",
    shortDescription:
      "Secure, title-verified land across Lagos, Abuja and Port Harcourt for personal use or investment, backed by full legal documentation.",
    benefits: [
      "Governor's Consent documentation",
      "Site verification support",
      "Flexible acreage options",
      "Investment-grade locations",
      "Survey and encumbrance checks",
      "Registration and allocation support",
    ],
    process: [
      "Location consultation",
      "Site visit",
      "Due diligence and documentation",
      "Allocation and registration",
    ],
    faqs: [
      {
        q: "Is the land free from government acquisition?",
        a: "All land we sell undergoes a documentation and encumbrance check before it's listed, so you can buy with confidence.",
      },
      {
        q: "Can I build immediately after purchase?",
        a: "Yes, once registration is complete, you're free to commence development, subject to relevant approvals.",
      },
      {
        q: "Do you provide survey plans?",
        a: "Yes, a certified survey plan and title documents are provided as part of every land purchase.",
      },
    ],
  },
  {
    id: "svc-06",
    slug: "construction",
    title: "Construction",
    icon: "HardHat",
    shortDescription:
      "We build elegant homes that reflect sophistication, comfort and modern living, backed by experienced project managers and vetted contractors.",
    benefits: [
      "Fixed-cost contracting",
      "Certified materials & standards",
      "On-site project supervision",
      "Defects liability support",
    ],
    process: [
      "Scope & budget definition",
      "Contractor engagement",
      "Construction & supervision",
      "Final inspection & handover",
    ],
    faqs: [
      {
        q: "Do you build on land I already own?",
        a: "Yes, our construction arm handles standalone builds independent of our development projects.",
      },
      {
        q: "How do you ensure quality control?",
        a: "Dedicated site supervisors and scheduled quality checkpoints run throughout every build.",
      },
    ],
  },
  {
    id: "svc-07",
    slug: "architecture",
    title: "Architecture & Design",
    icon: "Ruler",
    shortDescription:
      "Bespoke architectural design services that balance aesthetics, functionality and local building requirements.",
    benefits: [
      "Custom residential & commercial design",
      "3D visualization",
      "Regulatory-compliant drawings",
      "Sustainable design options",
    ],
    process: [
      "Client brief & concept",
      "Design development",
      "Approvals & documentation",
      "Construction-ready drawings",
    ],
    faqs: [
      {
        q: "Can you design for a plot I already own?",
        a: "Yes, our design team works independently of our development and construction services.",
      },
      {
        q: "Do you offer 3D renders before construction?",
        a: "Yes, every design package includes 3D visualization for client sign-off.",
      },
    ],
  },
  {
    id: "svc-08",
    slug: "consultancy",
    title: "Real Estate Consultancy",
    icon: "ClipboardList",
    shortDescription:
      "Expert advisory across valuation, feasibility, market entry and property strategy for individuals and corporates.",
    benefits: [
      "Independent property valuation",
      "Feasibility studies",
      "Market entry strategy",
      "Corporate real estate advisory",
    ],
    process: [
      "Scope definition",
      "Research & analysis",
      "Report & recommendations",
      "Implementation support",
    ],
    faqs: [
      {
        q: "Do you consult for corporate clients?",
        a: "Yes, we work with corporates on office relocation, expansion and portfolio strategy.",
      },
      {
        q: "How is consultancy priced?",
        a: "Fees depend on project scope. We provide a proposal after an initial scoping call.",
      },
    ],
  },
  {
    id: "svc-09",
    slug: "site-inspection",
    title: "Site Inspection",
    icon: "Compass",
    shortDescription:
      "Guided, no-pressure inspection visits so you can experience a property firsthand before committing.",
    benefits: [
      "Flexible scheduling",
      "Guided agent walkthroughs",
      "Group or private inspections",
      "Virtual inspection option",
    ],
    process: [
      "Book a slot",
      "Confirmation call",
      "On-site guided tour",
      "Post-visit consultation",
    ],
    faqs: [
      {
        q: "Is site inspection free?",
        a: "Yes, standard inspections are complimentary; premium chartered group tours may attract a small fee.",
      },
      {
        q: "Can I inspect multiple properties in one visit?",
        a: "Yes, let us know your shortlist and we'll plan an efficient multi-property route.",
      },
    ],
  },
];

const team = [
  {
    id: "tm-01",
    group: "board",
    name: "Adeola Faj-Johnson",
    role: "Chairman / Founder",
    bio: "With over 20 years in real estate and infrastructure development, Adeola founded FAJ Prime Estates to bring institutional-grade professionalism to Nigeria's property market.",
    image: "/images/team/adeola-faj-johnson.webp",
    linkedin: "https://linkedin.com/in/adeolafajjohnson",
  },
  {
    id: "tm-02",
    group: "board",
    name: "Dr. Kunle Adebayo",
    role: "Vice Chairman",
    bio: "A seasoned economist and urban planner, Dr. Adebayo guides FAJ Prime's strategic direction and market expansion.",
    image: "/images/team/kunle-adebayo.webp",
    linkedin: "https://linkedin.com/in/kunleadebayo",
  },
  {
    id: "tm-03",
    group: "board",
    name: "Amara Nwachukwu",
    role: "Non-Executive Director",
    bio: "Amara brings deep capital markets expertise, having spent over a decade advising real estate investment vehicles across West Africa.",
    image: "/images/team/amara-nwachukwu.webp",
    linkedin: "https://linkedin.com/in/amaranwachukwu",
  },
  {
    id: "tm-04",
    group: "board",
    name: "Barrister Femi Coker",
    role: "Legal Director",
    bio: "Femi oversees legal governance and regulatory compliance across all FAJ Prime transactions and developments.",
    image: "/images/team/femi-coker.webp",
    linkedin: "https://linkedin.com/in/femicoker",
  },
  {
    id: "tm-05",
    group: "management",
    name: "Emeka Obi",
    role: "Head of Sales",
    bio: "Emeka leads the sales function, having closed over ₦15 billion in property transactions across his career.",
    image: "/images/team/emeka-obi.webp",
    linkedin: "https://linkedin.com/in/emekaobi",
  },
  {
    id: "tm-06",
    group: "management",
    name: "Halima Bello",
    role: "Head of Property Management",
    bio: "Halima ensures every managed property under FAJ Prime delivers consistent value and service excellence to owners and tenants alike.",
    image: "/images/team/halima-bello.webp",
    linkedin: "https://linkedin.com/in/halimabello",
  },
  {
    id: "tm-07",
    group: "management",
    name: "Chuka Ibe",
    role: "Head of Construction",
    bio: "A civil engineer by training, Chuka oversees on-site execution and quality assurance for every FAJ Prime development.",
    image: "/images/team/chuka-ibe.webp",
    linkedin: "https://linkedin.com/in/chukaibe",
  },
  {
    id: "tm-08",
    group: "management",
    name: "Grace Effiong",
    role: "Head of Marketing",
    bio: "Grace drives brand strategy and market positioning, sharpening FAJ Prime's identity as a premium real estate name.",
    image: "/images/team/grace-effiong.webp",
    linkedin: "https://linkedin.com/in/graceeffiong",
  },
  {
    id: "tm-09",
    group: "management",
    name: "Segun Alade",
    role: "Head of Finance",
    bio: "Segun manages financial planning and investment structuring, ensuring disciplined capital allocation across all projects.",
    image: "/images/team/segun-alade.webp",
    linkedin: "https://linkedin.com/in/segunalade",
  },
  {
    id: "tm-10",
    group: "management",
    name: "Ifeoma Chukwu",
    role: "Head of Customer Experience",
    bio: "Ifeoma leads client relations, ensuring every buyer and tenant journey with FAJ Prime feels seamless and personal.",
    image: "/images/team/ifeoma-chukwu.webp",
    linkedin: "https://linkedin.com/in/ifeomachukwu",
  },
];

const testimonials = [
  {
    id: "tst-01",
    name: "Chiamaka Okoro",
    location: "Lekki, Lagos",
    rating: 5,
    review:
      "FAJ Prime made buying my first property seamless and stress-free from start to finish. Their team was patient, transparent and genuinely invested in finding the right home for me.",
    image: "/images/team/testimonial-chiamaka.webp",
  },
  {
    id: "tst-02",
    name: "David Okonkwo",
    location: "Houston, USA (Diaspora Client)",
    rating: 5,
    review:
      "As a diaspora investor, I was nervous about buying property remotely. FAJ Prime's virtual inspection and documentation support gave me full confidence in the process.",
    image: "/images/team/testimonial-david.webp",
  },
  {
    id: "tst-03",
    name: "Aisha Mohammed",
    location: "Maitama, Abuja",
    rating: 5,
    review:
      "The quality of construction on our Maitama duplex exceeded expectations. Every detail, from the finishing to the landscaping, reflected true premium standards.",
    image: "/images/team/testimonial-aisha.webp",
  },
  {
    id: "tst-04",
    name: "Oluwaseun Adebayo",
    location: "Victoria Island, Lagos",
    rating: 4,
    review:
      "Professional agents, clear communication, and a smooth closing process. I've since referred two colleagues to FAJ Prime.",
    image: "/images/team/testimonial-seun.webp",
  },
  {
    id: "tst-05",
    name: "Blessing Nwosu",
    location: "Ajah, Lagos",
    rating: 5,
    review:
      "I appreciated how honest the team was about the property's condition and documentation status. No pressure, just genuine guidance.",
    image: "/images/team/testimonial-blessing.webp",
  },
  {
    id: "tst-06",
    name: "Emmanuel Wogu",
    location: "GRA, Port Harcourt",
    rating: 5,
    review:
      "FAJ Prime's property management team has kept our rental units consistently occupied with reliable tenants. Excellent ongoing service.",
    image: "/images/team/testimonial-emmanuel.webp",
  },
];

const blogPosts = [
  {
    id: "blg-01",
    slug: "why-lekki-is-nigerias-hottest-real-estate-market",
    category: "Market Insights",
    title: "Why Lekki Is Nigeria's Hottest Real Estate Market",
    date: "2026-06-12",
    readTime: "5 min",
    author: "Grace Effiong",
    image: "/images/blog/lekki-market.webp",
    excerpt:
      "Lekki's transformation into Lagos's premier residential and commercial corridor continues to accelerate. Here's what's driving the surge.",
    content:
      "Lekki's rapid infrastructure growth, from the Lekki-Epe expressway expansion to the Lekki Free Trade Zone, has fueled sustained demand for both residential and commercial real estate. Property values across Lekki Phase 1 and the wider Lekki corridor have appreciated steadily over the past five years, driven by young professionals, diaspora investors and a growing base of businesses relocating to the area. For investors, Lekki continues to offer strong rental yields alongside long-term capital appreciation, making it one of the most resilient submarkets in Lagos today.",
  },
  {
    id: "blg-02",
    slug: "off-plan-vs-completed-properties-which-is-right-for-you",
    category: "Buying Guide",
    title: "Off-Plan vs. Completed Properties: Which Is Right for You?",
    date: "2026-05-28",
    readTime: "6 min",
    author: "Emeka Obi",
    image: "/images/blog/off-plan-vs-completed.webp",
    excerpt:
      "Both options come with distinct advantages and trade-offs. Here's how to decide which fits your goals and risk appetite.",
    content:
      "Off-plan properties typically offer lower entry prices and flexible payment plans, making them attractive for investors comfortable with construction timelines. Completed properties, by contrast, offer immediate occupancy or rental income with no development risk. The right choice depends on your investment horizon, liquidity needs and comfort with construction-phase uncertainty. At FAJ Prime, we guide every client through this decision based on their specific financial goals.",
  },
  {
    id: "blg-03",
    slug: "a-guide-to-diaspora-property-investment-in-nigeria",
    category: "Investment",
    title: "A Guide to Diaspora Property Investment in Nigeria",
    date: "2026-05-10",
    readTime: "7 min",
    author: "Segun Alade",
    image: "/images/blog/diaspora-investment.webp",
    excerpt:
      "Investing from abroad comes with unique challenges. Here's how Nigerians in the diaspora can invest confidently and remotely.",
    content:
      "Remote property investment requires extra diligence: verified documentation, trusted local representation and transparent reporting. FAJ Prime supports diaspora clients with virtual site inspections, secure digital documentation and dedicated account management, removing the friction typically associated with cross-border real estate transactions. With the right partner, investing in Nigerian real estate from abroad can be both secure and highly rewarding.",
  },
  {
    id: "blg-04",
    slug: "understanding-governors-consent-what-buyers-need-to-know",
    category: "Legal",
    title: "Understanding Governor's Consent: What Buyers Need to Know",
    date: "2026-04-22",
    readTime: "5 min",
    author: "Barrister Femi Coker",
    image: "/images/blog/governors-consent.webp",
    excerpt:
      "Governor's Consent is one of the most misunderstood aspects of Nigerian property law. Here's a clear breakdown.",
    content:
      "Under the Land Use Act, any transfer of land held under a Certificate of Occupancy requires the Governor's Consent to be legally valid. Skipping this step is one of the most common, and costly, mistakes property buyers make in Nigeria. FAJ Prime ensures every transaction is properly perfected, protecting buyers from future title disputes.",
  },
  {
    id: "blg-05",
    slug: "5-signs-a-neighborhood-is-about-to-boom",
    category: "Market Insights",
    title: "5 Signs a Neighborhood Is About to Boom",
    date: "2026-04-05",
    readTime: "4 min",
    author: "Grace Effiong",
    image: "/images/blog/neighborhood-boom.webp",
    excerpt:
      "Smart investors spot emerging neighborhoods before prices catch up. Here's what to look for.",
    content:
      "Watch for infrastructure announcements, new commercial developments, improved road networks and early institutional investment. Areas like Ajah and parts of the Lekki-Epe corridor showed these exact signs years before their current price appreciation. Recognizing these early indicators is one of the most valuable skills a real estate investor can develop.",
  },
  {
    id: "blg-06",
    slug: "how-to-finance-your-first-home-in-nigeria",
    category: "Buying Guide",
    title: "How to Finance Your First Home in Nigeria",
    date: "2026-03-18",
    readTime: "6 min",
    author: "Segun Alade",
    image: "/images/blog/home-financing.webp",
    excerpt:
      "From mortgages to developer payment plans, here's a breakdown of the financing options available to first-time buyers.",
    content:
      "Nigerian buyers typically finance property through a combination of savings, developer-structured payment plans, and mortgage products from institutions like the Federal Mortgage Bank or commercial banks. Understanding the true cost of each option, including interest rates and documentation fees, is essential before committing. FAJ Prime works with select financing partners to make this process easier for our clients.",
  },
  {
    id: "blg-07",
    slug: "the-rise-of-smart-homes-in-nigerian-real-estate",
    category: "Trends",
    title: "The Rise of Smart Homes in Nigerian Real Estate",
    date: "2026-02-27",
    readTime: "5 min",
    author: "Chuka Ibe",
    image: "/images/blog/smart-homes.webp",
    excerpt:
      "Smart home technology is quickly moving from a luxury add-on to a standard buyer expectation. Here's why.",
    content:
      "From app-controlled security systems to solar-integrated power backup, smart home features are increasingly influencing buyer decisions in Nigeria's premium property segment. Developments like FAJ Prime Heights are being designed with this technology built in from the ground up, rather than retrofitted later.",
  },
  {
    id: "blg-08",
    slug: "commercial-real-estate-outlook-victoria-island-2026",
    category: "Market Insights",
    title: "Commercial Real Estate Outlook: Victoria Island 2026",
    date: "2026-01-30",
    readTime: "6 min",
    author: "Emeka Obi",
    image: "/images/blog/vi-commercial-outlook.webp",
    excerpt:
      "Grade-A office demand in Victoria Island continues to outpace supply. Here's what this means for investors and occupiers.",
    content:
      "Victoria Island remains Lagos's premier commercial address, with limited Grade-A office supply driving competitive rents. As multinational and fintech occupiers continue expanding their Lagos footprint, well-located commercial assets in VI are proving to be some of the most resilient investments in the current market.",
  },
];

const partners = [
  {
    id: "ptn-01",
    name: "Meridian Trust Bank",
    logo: "/images/partners/meridian-trust-bank.webp",
  },
  {
    id: "ptn-02",
    name: "Sterling & Coker Legal Practice",
    logo: "/images/partners/sterling-coker-legal.webp",
  },
  {
    id: "ptn-03",
    name: "Apex Mortgage Finance",
    logo: "/images/partners/apex-mortgage-finance.webp",
  },
  {
    id: "ptn-04",
    name: "Cornerstone Construction Group",
    logo: "/images/partners/cornerstone-construction.webp",
  },
  {
    id: "ptn-05",
    name: "Bluewave Insurance",
    logo: "/images/partners/bluewave-insurance.webp",
  },
  {
    id: "ptn-06",
    name: "Horizon Property Consultants",
    logo: "/images/partners/horizon-property-consultants.webp",
  },
  {
    id: "ptn-07",
    name: "Northgate Facility Management",
    logo: "/images/partners/northgate-facility-management.webp",
  },
  {
    id: "ptn-08",
    name: "Lagos Chamber of Real Estate",
    logo: "/images/partners/lagos-chamber-real-estate.webp",
  },
];

async function main() {
  console.log("Seeding agents...");
  for (const a of agents) {
    await prisma.agent.upsert({ where: { id: a.id }, update: a, create: a });
  }

  console.log("Seeding listings...");
  for (const { agent, type, status, ...rest } of listings) {
    await prisma.listing.upsert({
      where: { id: rest.id },
      update: {
        ...rest,
        type: listingTypeReverse[type],
        status: listingStatusReverse[status],
        agentId: agent,
      },
      create: {
        ...rest,
        type: listingTypeReverse[type],
        status: listingStatusReverse[status],
        agentId: agent,
      },
    });
  }

  console.log("Seeding projects...");
  for (const { status, ...rest } of projects) {
    await prisma.project.upsert({
      where: { id: rest.id },
      update: { ...rest, status: projectStatusReverse[status] },
      create: { ...rest, status: projectStatusReverse[status] },
    });
  }

  console.log("Seeding services...");
  for (const s of services) {
    await prisma.service.upsert({ where: { id: s.id }, update: s, create: s });
  }

  console.log("Seeding team...");
  for (const { group, ...rest } of team) {
    await prisma.teamMember.upsert({
      where: { id: rest.id },
      update: { ...rest, group: teamGroupReverse[group] },
      create: { ...rest, group: teamGroupReverse[group] },
    });
  }

  console.log("Seeding testimonials...");
  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }

  console.log("Seeding blog posts...");
  for (const { date, ...rest } of blogPosts) {
    await prisma.blogPost.upsert({
      where: { id: rest.id },
      update: { ...rest, date: new Date(date) },
      create: { ...rest, date: new Date(date) },
    });
  }

  console.log("Seeding partners...");
  for (const p of partners) {
    await prisma.partner.upsert({ where: { id: p.id }, update: p, create: p });
  }

  console.log("Done seeding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
