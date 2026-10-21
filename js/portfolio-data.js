/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION DATA
 * Clark Wilson Serrato — BOTleague Portfolio
 * ==============================================================================
 * This file serves as the single source of truth for all content across the portfolio.
 * To update your personal information, tools, projects, or contact details,
 * simply edit the values below. You do not need to edit complex HTML.
 */

const PORTFOLIO_DATA = {
  // --------------------------------------------------------------------------
  // 1. PERSONAL INFORMATION & BRAND
  // --------------------------------------------------------------------------
  personal: {
    fullName: "Clark Wilson Serrato",
    preferredName: "Clark",
    brandName: "BOTleague",
    professionalTitle: "4th Year Computer Engineering Student",
    fieldOfStudy: "Computer Engineering",
    currentStatus: "STUDENT",
    statusBadge: "Available for Internships & Projects",
    location: "Antipolo City, Rizal, Philippines",
    purpose: "Academic Portfolio & Personal Branding",
    email: "cw.serrato123@gmail.com",
    githubUrl: "https://github.com/BOTleague31",
    githubUsername: "BOTleague31",
    linkedinUrl: "", // Optional: Add your LinkedIn profile URL here
    
    // Path to your portrait. Replace with "assets/images/profile.jpg" when available.
    profileImage: "assets/images/profile-placeholder.svg",

    // Hero Section Copy
    heroEyebrow: "Engineering • Design • Technology • Development",
    headline: '"Lady Luck smiles on those that seize opportunities."',
    shortIntro: "Hi! I'm Clark, an aspiring Developer, currently learning and building my skills.",
    
    // Clean Profile Overview for Hero Card
    specs: [
      { label: "Age:", value: "21 Years Old" },
      { label: "Program:", value: "B.S Computer Engineering (4th year)" },
      { label: "Location", value: "Antipolo City, Rizal, Philippines" },
    ]
  },

  // --------------------------------------------------------------------------
  // 2. ABOUT ME SECTION
  // --------------------------------------------------------------------------
  about: {
    sectionNumber: "01",
    sectionTitle: "About Me",
    eyebrow: "Background & Philosophy",
    lead: "A 4th-year Computer Engineering student. I show interest in ",
    
    // Main narrative paragraphs
    paragraphs: [
      "I am a Computer Engineering student based in Antipolo City, Rizal. My academic journey centers on the exploration of hardware, code, and mathematics to solve practical challenges.",
      "Throughout my coursework and personal exploration, I have worked across diverse domains—from writing embedded C++ firmware for assistive microcontroller devices to drafting blueprints in AutoCAD and modeling and visualizing 3D architectural spaces in SketchUp and Twinmotion respectively.",
    ],

    // Three Core Pillars of Focus
    pillars: [
      {
        icon: "microchip",
        title: "Embedded Systems & Firmware",
        description: "Programming and debugging C++ firmware for Arduino microcontrollers using Arduino IDE"
      },
      {
        icon: "blueprint",
        title: "CAD & 3D Spatial Design",
        description: "Drafting technical floor plans in AutoCAD for data communication infrastructure and modeling 3D spaces in SketchUp and Twinmotion."
      },
      {
        icon: "code",
        title: "Software & Web Development",
        description: "Building responsive, accessible web interfaces and software logic with a focus on clean modular code and user-centered design."
      }
    ],

    // What I'm currently learning
    currentFocus: {
      title: "Current Focus & Exploration",
      description: "Deepening my knowledge of development, IoT wireless protocols, modern frontend systems, and preparing for research deliverables."
    }
  },

  // --------------------------------------------------------------------------
  // 3. TOOLS & TECHNICAL SKILLS
  // --------------------------------------------------------------------------
  // Tools are categorized accurately with descriptions of actual usage.
  tools: [
    {
      id: "arduino",
      name: "Arduino IDE",
      category: "Embedded & Hardware",
      categoryKey: "embedded",
      description: "Used in Embedded Systems to program a Smart Cane with ultrasonic distance sensors and haptic feedback alerts.",
      level: "Academic Application",
      tags: ["C++", "Sensors", "Microcontrollers", "Hardware"]
    },
    {
      id: "autocad",
      name: "AutoCAD",
      category: "CAD & Technical Drawing",
      categoryKey: "cad",
      description: "Used in Data Communications to draft an office floor plan detailing structured cabling, server room placement, and network drops.",
      level: "Academic Drafting",
      tags: ["2D CAD", "Floor Plans", "Network Topology", "Technical Standards"]
    },
    {
      id: "sketchup",
      name: "SketchUp",
      category: "3D Modeling",
      categoryKey: "modeling",
      description: "Used for 3D architectural structural modeling, spatial planning, and massing geometries for visualization pipelines.",
      level: "Spatial Modeling",
      tags: ["3D Modeling", "Spatial Design", "Geometry"]
    },
    {
      id: "twinmotion",
      name: "Twinmotion",
      category: "3D Visualization",
      categoryKey: "modeling",
      description: "Used for real-time architectural visualization, photorealistic lighting, environmental rendering, and scene composition.",
      level: "Real-time Rendering",
      tags: ["Real-time Render", "Lighting", "Environment", "PBR Materials"]
    },
    {
      id: "vscode",
      name: "VS Code",
      category: "Development Tools",
      categoryKey: "dev",
      description: "Primary development environment for writing web applications, embedded scripts, and maintaining code repositories.",
      level: "Daily Workflow",
      tags: ["Editor", "Extensions", "Git Integration"]
    },
    {
      id: "git",
      name: "Git & GitHub",
      category: "Development Tools",
      categoryKey: "dev",
      description: "Used for version control, branch management, collaborative tracking, and hosting live projects via GitHub Pages.",
      level: "Version Control",
      tags: ["Git", "GitHub Pages", "Repository Management"]
    }
  ],

  toolCategories: [
    { key: "all", label: "All Tools" },
    { key: "embedded", label: "Embedded & Hardware" },
    { key: "cad", label: "CAD & Drafting" },
    { key: "modeling", label: "3D & Visualization" },
    { key: "dev", label: "Development Tools" }
  ],

  // --------------------------------------------------------------------------
  // 4. FEATURED PROJECTS
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "smart-cane",
      title: "Smart Cane Assistive Navigation System",
      category: "Embedded Systems & Assistive Tech",
      categoryKey: "embedded",
      status: "COMPLETED",
      statusType: "academic",
      period: "Academic Project",
      thumbnail: "assets/images/smart-cane.svg",
      shortDescription: "An embedded smart cane developed with Arduino IDE, involves fall detection, light sensors as well as audio reminders.",
      tools: ["Arduino IDE", "C++", "Arduino Nano"],
    },
    {
      id: "autocad-floorplan",
      title: "Commercial Office Floor Plan & Network Topology",
      category: "CAD & Data Communications",
      categoryKey: "cad",
      status: "COMPLETED",
      statusType: "academic",
      period: "Academic Project",
      thumbnail: "assets/images/autocad-floorplan.svg",
      shortDescription: "Precision 2D technical CAD blueprint of a commercial corporate office detailing structured cabling, server room (MDF) layout, and workstation data drops.",
      tools: ["AutoCAD"],
    },
    {
      id: "twinmotion-render",
      title: "3D Spatial Design & Real-Time Visualization",
      category: "3D Modeling & Visualization",
      categoryKey: "modeling",
      status: "IN PROGRESS",
      statusType: "concept",
      period: "Design Study",
      thumbnail: "assets/images/twinmotion-render.svg",
      shortDescription: "3D structural modeling in SketchUp exported to Twinmotion for photorealistic lighting, dynamic weather, PBR material texturing, and spatial rendering.",
      tools: ["SketchUp", "Twinmotion", "3D Modeling", "Real-Time PBR", "Spatial Composition"],
      overview: "An ongoing spatial study exploring the transition from clean volumetric 3D modeling into photorealistic architectural rendering. Structural masses are modeled in SketchUp and synchronized with Twinmotion's real-time lighting engine.",
      problem: "Translating static conceptual geometry into an immersive, physically plausible space with accurate sunlight angles, material reflections, and contextual environment.",
      solution: "Created an optimized polygon model in SketchUp with clean layer groups, then leveraged Twinmotion's lumen global illumination, physically based materials (PBR glass, concrete, wood), and sun azimuth controls.",
      keyFeatures: [
        "Clean volumetric modeling with precise spatial proportions in SketchUp",
        "Twinmotion real-time scene synchronization and asset population",
        "Solar study simulation matching geographic coordinates and daylight hours",
        "High-resolution still renders and walk-through presentation camera paths"
      ],
      deliverables: ["SketchUp .SKP 3D model", "Twinmotion scene file", "High-res presentation stills (4K viewport)"]
    },
    {
      id: "botleague-portfolio",
      title: "BOTleague Personal Portfolio & Design System",
      category: "Web Development & Branding",
      categoryKey: "dev",
      status: "LIVE",
      statusType: "live",
      period: "Personal Project",
      thumbnail: "assets/images/smart-cane.svg",
      shortDescription: "A minimalist, responsive portfolio website built with clean semantic HTML5, modern CSS tokens, and JavaScript, hosted on GitHub Pages.",
      tools: ["HTML5", "Modern CSS", "Vanilla JavaScript", "GitHub Pages", "Responsive UI"],
      overview: "Designed and engineered as a modern, minimalist academic and personal branding website. Built without heavy dependencies to ensure ultra-fast load times, seamless accessibility, and effortless content maintenance via a centralized data file.",
      problem: "Building a portfolio that reflects both engineering rigor and design sensitivity without falling into the trap of generic, bloated website templates.",
      solution: "Engineered a custom design system featuring Swiss grid typography, dark/light theme switching, full keyboard accessibility, and a dedicated JSON/JS data configuration layer.",
      keyFeatures: [
        "Zero-dependency vanilla architecture deployable immediately to GitHub Pages",
        "Persistent Dark and Light mode with system theme auto-detection",
        "Accessible modal dialogs with focus trapping and keyboard navigation",
        "Fully responsive layout optimized from 320px mobile to 4K monitors"
      ],
      deliverables: ["Open source GitHub repository", "Live GitHub Pages deployment", "Documentation README.md"]
    }
  ],

  // --------------------------------------------------------------------------
  // 5. CONTACT SECTION
  // --------------------------------------------------------------------------
  contact: {
    sectionNumber: "04",
    sectionTitle: "Contact",
    eyebrow: "Get in Touch",
    headline: "Want to reach me?",
    subtext: "Message me on my email address. You can also check out my GitHub, and socials below",
    email: "cw.serrato123@gmail.com",
    location: "Antipolo City, Rizal, Philippines",
    githubUrl: "https://github.com/BOTleague31",
    githubDisplay: "BOTleague31",
    facebookUrl: "https://www.facebook.com/clarkwilson.serrato/", 
    facebookDisplay: "Clark Wilson Serrato",
    instagramUrl: "https://www.instagram.com/bt.lg000/", 
    instagramDisplay: "bt.lg000",

    copySuccessMessage: "Email address copied to clipboard!"
  },

  // --------------------------------------------------------------------------
  // 6. FOOTER
  // --------------------------------------------------------------------------
  footer: {
    brand: "BOTleague",
    name: "Clark Wilson Serrato",
    tagline: "Computer Engineering Student • Technology & Design",
    year: new Date().getFullYear(),
    statusText: "Antipolo City, Philippines • Built for GitHub Pages"
  }
};

// Export for module systems if needed, while remaining globally accessible for plain script tags
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
