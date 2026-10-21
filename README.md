# BOTleague — Personal Portfolio Website
### Clark Wilson Serrato | 4th Year Computer Engineering Student
**Academic Portfolio & Personal Branding**

A clean, minimalist, high-performance personal portfolio website built with a Swiss/architectural editorial aesthetic, responsive grid system, dark/light theme switching, and accessible interactive project modals.

---

## 📁 Repository & Directory Structure

```text
botleague-portfolio/
├── index.html                 # Semantic HTML5 root markup
├── README.md                  # Setup, customization & deployment documentation
├── css/
│   └── style.css              # Design tokens, Swiss grid typography, dark/light themes
├── js/
│   ├── portfolio-data.js      # SINGLE EDITABLE CONFIGURATION FILE (Edit your info here!)
│   └── main.js                # Dynamic rendering, theme engine, modal & form handling
└── assets/
    ├── favicon.svg            # Custom SVG vector monogram icon
    └── images/
        ├── profile-placeholder.svg # Architectural silhouette (Replace with profile.jpg)
        ├── smart-cane.svg          # Smart Cane schematic (Arduino / Embedded Systems)
        ├── autocad-floorplan.svg   # 2D CAD blueprint (Data Communications)
        └── twinmotion-render.svg   # 3D spatial render (SketchUp & Twinmotion)
```

---

## ⚡ Quick Start / Local Preview

Because this portfolio uses clean, native Web standards (HTML5, Modern CSS, Vanilla JavaScript):
- **Zero build steps or npm installations required.**
- Works directly in any modern browser.

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer, or right-click `index.html` and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: VS Code Live Server (Recommended)
1. Open the `botleague-portfolio` folder in **VS Code**.
2. If installed, click **"Go Live"** in the bottom status bar (or right-click `index.html` and select **Open with Live Server**).
3. The site will open at `http://127.0.0.1:5500`.

---

## ✏️ How to Customize Your Portfolio

All personal information, tools, projects, and contact details are stored in one single, clearly organized configuration file:
👉 **`js/portfolio-data.js`**

You do **not** need to touch complex HTML to update your content!

### 1. Updating Personal Information
Open `js/portfolio-data.js` and edit the `personal` object:
```javascript
personal: {
  fullName: "Clark Wilson Serrato",
  preferredName: "Clark",
  brandName: "BOTleague",
  professionalTitle: "4th Year Computer Engineering Student",
  location: "Antipolo City, Rizal, Philippines",
  email: "cw.serrato123@gmail.com",
  githubUrl: "https://github.com/BOTleague31",
  linkedinUrl: "https://linkedin.com/in/your-profile", // Add LinkedIn URL when ready
  ...
}
```

### 2. Adding Your Profile Photo
1. Place your real portrait photo (JPEG or PNG) into the `assets/images/` directory, named `profile.jpg`.
2. In `js/portfolio-data.js`, change:
   ```javascript
   profileImage: "assets/images/profile.jpg",
   ```
3. Save the file. Your profile photo will now appear framed in the hero specification card.

### 3. Adding or Editing Tools
In `js/portfolio-data.js`, find the `tools` array. You can edit any existing tool description or add a new one:
```javascript
{
  id: "python",
  name: "Python",
  category: "Software & Development",
  categoryKey: "dev", // matches a category in toolCategories
  description: "Used for data scripting, automation, and backend logic experimentation.",
  level: "Scripting & Algorithms",
  tags: ["Python", "Scripting", "Automation"]
}
```

> **Design Principle**: No arbitrary proficiency percentages or fake progress bars are used, as per professional engineering portfolio standards.

### 4. Adding or Editing Projects
In `js/portfolio-data.js`, locate the `projects` array. Each project is presented directly as a clean card with its brief description and tools:
```javascript
{
  id: "my-new-project",
  title: "Project Title",
  category: "Engineering / CAD / Software",
  categoryKey: "embedded", // 'embedded', 'cad', 'modeling', or 'dev'
  status: "COMPLETED",     // 'COMPLETED', 'IN PROGRESS', or 'CONCEPT'
  period: "Academic Project 2026",
  thumbnail: "assets/images/my-project-image.jpg",
  shortDescription: "A concise 1-2 sentence overview of the project.",
  tools: ["Arduino", "C++", "Sensors"],
  overview: "Detailed background of the project...",
  problem: "The specific challenge or design constraint addressed...",
  solution: "How you engineered the solution...",
  keyFeatures: [
    "Feature 1 description",
    "Feature 2 description"
  ],
  deliverables: ["Circuit schematic", "Source code", "Prototype"]
}
```

### 5. Configuring Contact Channels & Social Links

In `js/portfolio-data.js`, you can update your email address, GitHub profile, Facebook link, and Instagram handle:
```javascript
contact: {
  email: "cw.serrato123@gmail.com",
  location: "Antipolo City, Rizal, Philippines",
  githubUrl: "https://github.com/BOTleague31",
  githubDisplay: "github.com/BOTleague31",
  facebookUrl: "https://facebook.com/your-profile",
  facebookDisplay: "facebook.com/your-profile",
  instagramUrl: "https://instagram.com/your-handle",
  instagramDisplay: "@your-handle"
}
```
Visitors can click to visit your profiles directly or copy your email address to their clipboard with one click.

---

## 🚀 How to Deploy to GitHub Pages

Because your repository is located at `https://github.com/BOTleague31`, you can deploy this website for free in under 2 minutes:

### Step 1: Initialize Git and Commit
Open PowerShell or your terminal in this `botleague-portfolio` directory:
```powershell
cd d:\Projects\botleague-portfolio
git init
git add .
git commit -m "feat: complete BOTleague portfolio with modern design system"
```

### Step 2: Push to GitHub
Create a new public repository on GitHub named `portfolio` (or `BOTleague31.github.io` for a root user page):
```powershell
git branch -M main
git remote add origin https://github.com/BOTleague31/portfolio.git
git push -u origin main
```

### Step 3: Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub: `https://github.com/BOTleague31/portfolio`
2. Click **Settings** (top tab).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment > Source**, choose **Deploy from a branch**.
5. Under **Branch**, select `main` and folder `/ (root)`.
6. Click **Save**.
7. In about 60 seconds, your site will be live at:
   `https://botleague31.github.io/portfolio/`

*(If you named your repository `BOTleague31.github.io`, your URL will be `https://botleague31.github.io/`)*

---

## 🎨 Design System Specifications

| Property | Value |
| :--- | :--- |
| **Aesthetic** | Minimalist, Architectural Editorial, Earth-toned, Grounded |
| **Typography** | `Inter` (Primary Sans) & `JetBrains Mono` (Technical Metadata) |
| **Color Modes** | Light Mode (Linen `#f6f4ee` / Alt `#ece7dc`) & Dark Mode (Dark Roast `#181513` / Alt `#211d1a`) |
| **Accent Color** | Terracotta / Burnt Clay (`#b8582d` in Light, `#d97746` in Dark) |
| **Borders & Corners** | Warm stone borders (`1px solid`), subtle radius (`4px - 8px`) |
| **Accessibility** | Semantic HTML5 landmarks, WCAG AA contrast, keyboard focus traps |
| **Performance** | Zero external frameworks, 100% Core Web Vitals optimized |

---

## 📄 License & Attribution
Designed & Engineered for **Clark Wilson Serrato** (`BOTleague`).
Academic Portfolio & Personal Branding.
