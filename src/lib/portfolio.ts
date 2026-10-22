/**
 * Shared content model for the CMS-backed portfolio.
 * - The server (D1 migration seed + site pages) imports the seed + types.
 * - The admin portal imports the types for its CRUD UI.
 */

export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  status: "Ongoing" | "Completed";
  location: string;
  year: string;
  value: string;
  image: string; // "/images/projects/x.jpg" (static) or "/media/<key>" (uploaded)
  description: string;
  client: string;
  progress: number; // 0-100
}

export type NewProject = Omit<PortfolioProject, "id">;

export interface MediaItem {
  id: string; // R2 key, also the public path /media/<id>
  kind: "image" | "video";
  name: string;
  type: string; // mime
  size: number; // bytes
  created_at: string; // ISO
}

export const PROJECT_CATEGORIES = [
  "Roads",
  "Buildings",
  "Water Works",
  "Landscaping",
  "Environment",
  "Consultancy",
];

/** Seed = the original hardcoded portfolio, inserted into D1 on first run. */
export const SEED_PROJECTS: NewProject[] = [
  {
    title: " Road Expansion ",
    category: "Roads",
    status: "Completed",
    location: "Kilifi, Kenya",
    year: "2023",
    value: "KES 20M",
    image: "/images/projects/road-expansion.jpg",
    description:
      "routine maintenance and spot improvement contract, managing earthworks, vegetative clearing, and asphalt concrete placement to meet strict alignment and design specifications.",
    client: "Kenya National Highways Authority (KeNHA)",
    progress: 100,
  },
  {
    title: " Water Treatment Plant",
    category: "Water Works",
    status: "Completed",
    location: "Lavington, Nairobi",
    year: "2025",
    value: "KES 180M",
    image: "/images/projects/water-treatment-plant.jpg",
    description:
      "structural evaluation and rehabilitation of water treatment infrastructure, sedimentation basins, chemical dosing lines, and peripheral safety handrails",
    client: "Nairobi City Water & Sewerage Company",
    progress: 100,
  },
  {
    title: "Karen Business Park Development",
    category: "Landscaping",
    status: "Completed",
    location: "Karen, Nairobi",
    year: "2026",
    value: "KES 15M",
    image: "/images/projects/landscaping.jpg",
    description:
      "50-acre mixed-use development featuring premium landscaping, Japanese gardens, water features, and sustainable green spaces.",
    client: "Karen Properties Ltd",
    progress: 100,
  },
  {
    title: "Embakasi Industrial Complex",
    category: "Buildings",
    status: "Completed",
    location: "Embakasi, Nairobi",
    year: "2024",
    value: "KES 320M",
    image: "/images/projects/industrial-complex.jpg",
    description:
      "8-unit warehouse development with modern loading bays, office facilities, fire suppression systems, and solar power integration.",
    client: "Embakasi Developers Ltd",
    progress: 100,
  },
  {
    title: "Nairobi River Rehabilitation",
    category: "Environment",
    status: "Completed",
    location: "Nairobi CBD",
    year: "2025",
    value: "KES 95M",
    image: "/images/projects/nairobi-river-rehabilitation.jpg",
    description:
      "Environmental restoration of a 3km stretch of the Nairobi River including riparian planting, bank stabilization, and pollution control.",
    client: "Nairobi Metropolitan Services (NMS)",
    progress: 100,
  },
  {
    title: "Syokimau Residential Estate",
    category: "Buildings",
    status: "Completed",
    location: "Syokimau, Machakos",
    year: "2025",
    value: "KES 550M",
    image: "/images/projects/syokimau-residential-estate.jpg",
    description:
      "120-unit gated residential estate with 3 & 4-bedroom units, clubhouse, swimming pool, and comprehensive utilities.",
    client: "Syokimau Holdings Ltd",
    progress: 100,
  },
  {
    title: "Road Drainage Upgrade",
    category: "Roads",
    status: "Completed",
    location: "Landhies road, Nairobi",
    year: "2024",
    value: "KES 51M",
    image: "/images/projects/road-drainage.jpg",
    description:
      "Stormwater drainage system upgrade along Landhies Road, eliminating chronic flooding and improving traffic flow.",
    client: "Nairobi City Water & Sewerage Company (NCWSC)",
    progress: 100,
  },
  {
    title: "Urban roads",
    category: "Roads",
    status: "Ongoing",
    location: "Nairobi County, Kenya",
    year: "2024",
    value: "KES 180M",
    image: "/images/projects/nairobi-roads.jpg",
    description:
      "Improvement of access roads to College and periodic maintenance of Kabarsiran Road",
    client: "Kenya Ports Authority (KPA)",
    progress: 60,
  },
  {
    title: "Westlands Office Tower",
    category: "Buildings",
    status: "Ongoing",
    location: "Westlands, Nairobi",
    year: "2024",
    value: "KES 890M",
    image: "/images/projects/Universal-Towers.jpg",
    description:
      "Grade A office tower with underground parking, smart building systems, and LEED-aligned sustainability features.",
    client: "Westlands Development Ltd",
    progress: 45,
  },
  {
    title: "Rural Water Supply",
    category: "Water Works",
    status: "Completed",
    location: "Kakamega County",
    year: "2022",
    value: "KES 140M",
    image: "/images/projects/water-supply.jpg",
    description:
      "Rural water supply scheme serving 15,000 households across 8 sub-locations with boreholes, pipelines, and community kiosks.",
    client: "Kilyan Group Ltd",
    progress: 100,
  },
  {
    title: "Landscaping & Grounds",
    category: "Landscaping",
    status: "Completed",
    location: "Runda",
    year: "2021",
    value: "KES 55M",
    image: "/images/projects/landscaping-2.jpg",
    description:
      "Comprehensive landscaping  approaches, parking areas, and airside green spaces covering 30+ acres.",
    client: "Private Aviation Services Ltd",
    progress: 100,
  },
  {
    title: "Construction of Single Residential House",
    category: "Buildings",
    status: "Completed",
    location: "Nairobi County",
    year: "2020",
    value: "KES 22M",
    image: "/images/projects/patel.jpg",
    description:
      "Construction of fully furnished complete with landscaping services of a Single Residential House.",
    client: "Umang Patel",
    progress: 100,
  },
];
