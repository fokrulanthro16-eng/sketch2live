export interface Preset {
  id: string;
  title: string;
  description: string;
  category: string;
  imagePath: string;
  tags: string[];
}

export const PRESETS: Preset[] = [
  {
    id: "saas-landing",
    title: "SaaS Landing Page",
    description: "Modern landing page with sticky navbar, hero CTA, 3 feature cards, and footer.",
    category: "Web App",
    imagePath: "/presets/saas_landing_sketch.png",
    tags: ["Hero Section", "Grid Cards", "Navbar", "Responsive"],
  },
  {
    id: "mobile-auth",
    title: "Mobile Auth Screen",
    description: "Mobile login interface with social buttons, email/password inputs, and bottom CTA.",
    category: "Mobile UI",
    imagePath: "/presets/mobile_login_sketch.png",
    tags: ["Mobile Frame", "Form Inputs", "Social Login", "Modern"],
  },
  {
    id: "disaster-relief",
    title: "Disaster Relief Triage",
    description: "Offline field intake form for emergency supplies, medical priority, and victim logs.",
    category: "Field & Emergency",
    imagePath: "/presets/disaster_relief_triage_sketch.png",
    tags: ["Field Triage", "Offline Form", "CSV Export", "Emergency"],
  },
];
