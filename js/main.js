/**
 * ==============================================================================
 * BOTleague — Portfolio Core Engine
 * Clark Wilson Serrato | 4th Year Computer Engineering Student
 * ==============================================================================
 * Handles:
 * 1. Data hydration from PORTFOLIO_DATA
 * 2. Theme toggling (Dark / Light) with system preference & localStorage
 * 3. Tool filtering
 * 4. Project detail modal dialog (accessible, keyboard trapped, Escape to close)
 * 5. Functional contact form (with client-side validation & mailto/endpoint delivery)
 * 6. One-click email copy with toast feedback
 * 7. Mobile drawer menu & scrollspy navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  // Verify configuration exists
  if (typeof PORTFOLIO_DATA === "undefined") {
    console.error("PORTFOLIO_DATA not found. Please ensure js/portfolio-data.js is loaded.");
    return;
  }

  /* --------------------------------------------------------------------------
     1. THEME MANAGEMENT
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const sunIcon = themeToggleBtn?.querySelector(".sun-icon");
  const moonIcon = themeToggleBtn?.querySelector(".moon-icon");

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem("botleague_theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("botleague_theme", theme);

    if (sunIcon && moonIcon) {
      if (theme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
        themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
      }
    }
  }

  // Initialize theme
  applyTheme(getPreferredTheme());

  themeToggleBtn?.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  // Listen for OS theme preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("botleague_theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  /* --------------------------------------------------------------------------
     2. HYDRATE DOM FROM PORTFOLIO_DATA
     -------------------------------------------------------------------------- */
  const { personal, about, tools, toolCategories, projects, contact, footer } = PORTFOLIO_DATA;

  // Header & Brand
  const navBrandTitle = document.getElementById("nav-brand-title");
  const navBrandSub = document.getElementById("nav-brand-sub");
  if (navBrandTitle) navBrandTitle.textContent = personal.brandName;
  if (navBrandSub) navBrandSub.textContent = `${personal.preferredName} Serrato`;

  // Hero Section
  const heroEyebrow = document.getElementById("hero-eyebrow");
  const heroStatusText = document.getElementById("hero-status-text");
  const heroFullname = document.getElementById("hero-fullname");
  const heroHeadline = document.getElementById("hero-headline");
  const heroIntro = document.getElementById("hero-intro");
  const heroGithubLink = document.getElementById("hero-github-link");
  const profileImg = document.getElementById("profile-img");
  const heroSpecsList = document.getElementById("hero-specs-list");

  if (heroEyebrow) heroEyebrow.textContent = personal.heroEyebrow;
  if (heroStatusText) heroStatusText.textContent = personal.statusBadge;
  if (heroFullname) heroFullname.textContent = personal.fullName;
  if (heroHeadline) heroHeadline.textContent = personal.headline;
  if (heroIntro) heroIntro.textContent = personal.shortIntro;
  if (heroGithubLink) heroGithubLink.href = personal.githubUrl;
  if (profileImg && personal.profileImage) {
    profileImg.src = personal.profileImage;
    profileImg.alt = `${personal.fullName} — Technical Portrait`;
  }

  // Hydrate Hero Specs
  if (heroSpecsList && personal.specs) {
    heroSpecsList.innerHTML = personal.specs.map(spec => `
      <div class="spec-row">
        <span class="spec-label">${escapeHtml(spec.label)}</span>
        <span class="spec-value">${escapeHtml(spec.value)}</span>
      </div>
    `).join("");
  }

  // About Section
  const aboutEyebrow = document.getElementById("about-eyebrow");
  const aboutTitle = document.getElementById("about-title");
  const aboutLead = document.getElementById("about-lead");
  const aboutNarrativeContainer = document.getElementById("about-narrative-container");
  const currentFocusTitle = document.getElementById("current-focus-title");
  const currentFocusDesc = document.getElementById("current-focus-desc");

  if (aboutEyebrow) aboutEyebrow.textContent = about.eyebrow;
  if (aboutTitle) aboutTitle.textContent = about.sectionTitle;
  if (aboutLead) aboutLead.textContent = about.lead;

  if (aboutNarrativeContainer && about.paragraphs) {
    // Generate narrative paragraphs + current focus box
    const paragraphsHtml = about.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("");
    const focusHtml = `
      <div class="current-focus-box">
        <div class="current-focus-title" id="current-focus-title">${escapeHtml(about.currentFocus.title)}</div>
        <div class="current-focus-desc" id="current-focus-desc">${escapeHtml(about.currentFocus.description)}</div>
      </div>
    `;
    aboutNarrativeContainer.innerHTML = paragraphsHtml + focusHtml;
  }

  // Hydrate About Pillars
  const aboutPillarsContainer = document.getElementById("about-pillars-container");
  if (aboutPillarsContainer && about.pillars) {
    aboutPillarsContainer.innerHTML = about.pillars.map(pillar => `
      <div class="pillar-card">
        <div class="pillar-header">
          <div class="pillar-icon" aria-hidden="true">
            ${getPillarSvg(pillar.icon)}
          </div>
          <h3 class="pillar-title">${escapeHtml(pillar.title)}</h3>
        </div>
        <p class="pillar-desc">${escapeHtml(pillar.description)}</p>
      </div>
    `).join("");
  }

  /* --------------------------------------------------------------------------
     3. TOOLS SECTION (Dynamic Filtering & Rendering)
     -------------------------------------------------------------------------- */
  const toolFilterTabsContainer = document.getElementById("tool-filter-tabs");
  const toolsContainer = document.getElementById("tools-container");
  let activeToolFilter = "all";

  function renderToolFilters() {
    if (!toolFilterTabsContainer || !toolCategories) return;
    toolFilterTabsContainer.innerHTML = toolCategories.map(cat => `
      <button 
        type="button" 
        class="filter-btn ${cat.key === activeToolFilter ? 'active' : ''}" 
        data-filter="${cat.key}"
        role="tab"
        aria-selected="${cat.key === activeToolFilter}"
      >
        ${escapeHtml(cat.label)}
      </button>
    `).join("");

    // Attach click listeners to filter buttons
    toolFilterTabsContainer.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeToolFilter = btn.getAttribute("data-filter");
        renderToolFilters();
        renderToolsGrid();
      });
    });
  }

  function renderToolsGrid() {
    if (!toolsContainer || !tools) return;

    const filteredTools = activeToolFilter === "all" 
      ? tools 
      : tools.filter(t => t.categoryKey === activeToolFilter);

    toolsContainer.innerHTML = filteredTools.map(tool => `
      <article class="tool-card">
        <div>
          <div class="tool-card-header">
            <div class="tool-name-group">
              <div class="tool-icon-frame" aria-hidden="true">
                ${getToolSvg(tool.id)}
              </div>
              <div>
                <h3 class="tool-name">${escapeHtml(tool.name)}</h3>
                <span class="tool-category-badge">${escapeHtml(tool.category)}</span>
              </div>
            </div>
          </div>
          <p class="tool-description">${escapeHtml(tool.description)}</p>
        </div>
        <div class="tool-tags">
          ${tool.tags.map(tag => `<span class="tool-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </article>
    `).join("");
  }

  renderToolFilters();
  renderToolsGrid();

  /* --------------------------------------------------------------------------
     4. FEATURED PROJECTS SECTION (Brief Description Cards)
     -------------------------------------------------------------------------- */
  const projectsContainer = document.getElementById("projects-container");

  function renderProjectsGrid() {
    if (!projectsContainer || !projects) return;

    projectsContainer.innerHTML = projects.map(proj => `
      <article class="project-card">
        <div class="project-thumbnail-wrapper">
          <img src="${proj.thumbnail}" alt="${escapeHtml(proj.thumbnailAlt || `${proj.title} Preview`)}" loading="lazy">
          <div class="project-badge-overlay">
            <span class="project-status-tag">${escapeHtml(proj.status)}</span>
          </div>
        </div>

        <div class="project-card-body">
          <span class="project-category">${escapeHtml(proj.category)}</span>
          <h3 class="project-card-title">${escapeHtml(proj.title)}</h3>
          <p class="project-card-desc">${escapeHtml(proj.shortDescription)}</p>

          <div class="project-tools-row">
            ${proj.tools.map(toolName => `<span class="project-tool-pill">${escapeHtml(toolName)}</span>`).join("")}
          </div>

          <div class="project-card-footer">
            <span>${escapeHtml(proj.period)}</span>
          </div>
        </div>
      </article>
    `).join("");
  }

  renderProjectsGrid();

  /* --------------------------------------------------------------------------
     5. CONTACT SECTION (Direct Channels & Social Profiles)
     -------------------------------------------------------------------------- */
  const contactEyebrow = document.getElementById("contact-eyebrow");
  const contactHeadline = document.getElementById("contact-headline");
  const contactSubtext = document.getElementById("contact-subtext");
  const contactEmailText = document.getElementById("contact-email-text");
  const contactGithubLink = document.getElementById("contact-github-link");
  const contactGithubText = document.getElementById("contact-github-text");
  const contactFacebookLink = document.getElementById("contact-facebook-link");
  const contactFacebookText = document.getElementById("contact-facebook-text");
  const contactInstagramLink = document.getElementById("contact-instagram-link");
  const contactInstagramText = document.getElementById("contact-instagram-text");
  const contactLocationText = document.getElementById("contact-location-text");
  const copyEmailBtn = document.getElementById("copy-email-btn");

  if (contactEyebrow) contactEyebrow.textContent = contact.eyebrow;
  if (contactHeadline) contactHeadline.textContent = contact.headline;
  if (contactSubtext) contactSubtext.textContent = contact.subtext;
  if (contactEmailText) contactEmailText.textContent = contact.email;
  if (contactGithubLink) contactGithubLink.href = contact.githubUrl;
  if (contactGithubText) contactGithubText.textContent = contact.githubDisplay;
  if (contactFacebookLink && contact.facebookUrl) contactFacebookLink.href = contact.facebookUrl;
  if (contactFacebookText && contact.facebookDisplay) contactFacebookText.textContent = contact.facebookDisplay;
  if (contactInstagramLink && contact.instagramUrl) contactInstagramLink.href = contact.instagramUrl;
  if (contactInstagramText && contact.instagramDisplay) contactInstagramText.textContent = contact.instagramDisplay;
  if (contactLocationText) contactLocationText.textContent = contact.location;

  // Copy Email to Clipboard with Toast Notification
  copyEmailBtn?.addEventListener("click", () => {
    navigator.clipboard.writeText(contact.email)
      .then(() => {
        showToast(contact.copySuccessMessage || "Email address copied to clipboard!");
      })
      .catch(() => {
        // Fallback prompt if clipboard API is restricted
        window.prompt("Copy Clark's email:", contact.email);
      });
  });

  /* --------------------------------------------------------------------------
     6. FOOTER HYDRATION & BACK TO TOP
     -------------------------------------------------------------------------- */
  const footerBrandName = document.getElementById("footer-brand-name");
  const footerTagline = document.getElementById("footer-tagline");
  const footerCopyright = document.getElementById("footer-copyright");
  const footerStatus = document.getElementById("footer-status");
  const backToTopBtn = document.getElementById("back-to-top");

  if (footerBrandName) footerBrandName.textContent = `${footer.brand} • ${footer.name}`;
  if (footerTagline) footerTagline.textContent = footer.tagline;
  if (footerCopyright) footerCopyright.innerHTML = `&copy; ${footer.year} ${footer.name}. All rights reserved.`;
  if (footerStatus) footerStatus.textContent = footer.statusText;

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* --------------------------------------------------------------------------
     7. MOBILE DRAWER NAVIGATION & SCROLLSPY
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");

  mobileMenuBtn?.addEventListener("click", () => {
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
    mobileNavDrawer?.classList.toggle("open");
    mobileNavDrawer?.setAttribute("aria-hidden", String(isExpanded));
  });

  // Close mobile drawer when clicking any link
  mobileNavDrawer?.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuBtn?.setAttribute("aria-expanded", "false");
      mobileNavDrawer?.classList.remove("open");
      mobileNavDrawer?.setAttribute("aria-hidden", "true");
    });
  });

  // Scrollspy: Highlight Active Nav Link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  /* --------------------------------------------------------------------------
     8. TOAST NOTIFICATION HELPER
     -------------------------------------------------------------------------- */
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  let toastTimer = null;

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     9. SVG ICON GENERATORS (No external dependency)
     -------------------------------------------------------------------------- */
  function getPillarSvg(type) {
    switch (type) {
      case "microchip":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`;
      case "blueprint":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case "code":
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    }
  }

  function getToolSvg(id) {
    switch (id) {
      case "arduino":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="12" r="5"/><circle cx="17" cy="12" r="5"/><line x1="10.5" y1="12" x2="13.5" y2="12"/><line x1="6" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="18" y2="12"/><line x1="17" y1="11" x2="17" y2="13"/></svg>`;
      case "autocad":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;
      case "sketchup":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case "twinmotion":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      case "vscode":
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
      case "git":
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>`;
    }
  }

  // Security helper against accidental XSS in data file
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* --------------------------------------------------------------------------
     10. FAINT INTERACTIVE EARTH-TONED BACKGROUND OBJECT (HERO SECTION:
         PERSONAL INFORMATION & BRAND)
     -------------------------------------------------------------------------- */
  function initHeroInteractiveBackground() {
    const heroSection = document.getElementById("hero");
    const canvas = document.getElementById("hero-interactive-canvas");
    if (!heroSection || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Position state
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isMouseOver = false;

    // Rotation angles for 3D isometric architectural wireframe
    let rotX = 0.55;
    let rotY = 0.75;
    let rotZ = 0.25;
    let time = 0;

    function resize() {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const padding = 70;
      // Default initial resting position only on first load
      if (currentX === 0 && currentY === 0) {
        targetX = width * 0.70;
        targetY = height * 0.45;
        currentX = targetX;
        currentY = targetY;
      } else {
        // Keep within bounds on window resize
        targetX = Math.max(padding, Math.min(width - padding, targetX));
        targetY = Math.max(padding, Math.min(height - padding, targetY));
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Track mouse movement across Hero section (Personal Information & Brand)
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const padding = 70;
      // Clamp position so the object always stays gracefully within the hero section
      targetX = Math.max(padding, Math.min(width - padding, e.clientX - rect.left));
      targetY = Math.max(padding, Math.min(height - padding, e.clientY - rect.top));
      isMouseOver = true;
    }, { passive: true });

    heroSection.addEventListener("mouseenter", () => {
      isMouseOver = true;
    });

    // When cursor leaves the section, keep the object exactly at its last position
    heroSection.addEventListener("mouseleave", () => {
      isMouseOver = false;
      // Stays in the last position without resetting
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 3D Cube Definition (Architectural spatial volume)
    const cubeSize = 22;
    const vertices = [
      [-cubeSize, -cubeSize, -cubeSize],
      [cubeSize, -cubeSize, -cubeSize],
      [cubeSize, cubeSize, -cubeSize],
      [-cubeSize, cubeSize, -cubeSize],
      [-cubeSize, -cubeSize, cubeSize],
      [cubeSize, -cubeSize, cubeSize],
      [cubeSize, cubeSize, cubeSize],
      [-cubeSize, cubeSize, cubeSize]
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back square
      [4, 5], [5, 6], [6, 7], [7, 4], // front square
      [0, 4], [1, 5], [2, 6], [3, 7]  // connectors
    ];

    function project3D(x, y, z, rX, rY, rZ) {
      // Rotation X
      const y1 = y * Math.cos(rX) - z * Math.sin(rX);
      const z1 = y * Math.sin(rX) + z * Math.cos(rX);

      // Rotation Y
      const x2 = x * Math.cos(rY) + z1 * Math.sin(rY);
      const z2 = -x * Math.sin(rY) + z1 * Math.cos(rY);

      // Rotation Z
      const x3 = x2 * Math.cos(rZ) - y1 * Math.sin(rZ);
      const y3 = x2 * Math.sin(rZ) + y1 * Math.cos(rZ);

      const perspective = 360;
      const scale = perspective / (perspective + z2 * 0.4);

      return {
        x: x3 * scale,
        y: y3 * scale
      };
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      time += 0.016;

      // Smooth inertia tracking (lerp)
      const ease = 0.065;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * ease;
      currentY += dy * ease;

      // Stays precisely at the last cursor position
      const displayX = currentX;
      const displayY = currentY;

      // Dynamic rotation with tilt proportional to cursor speed & distance
      if (!prefersReducedMotion) {
        rotX += 0.004 + dy * 0.00010;
        rotY += 0.006 + dx * 0.00010;
        rotZ += 0.0015;
      }

      // Check current theme for authentic earth-toned palette
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      // Terracotta primary tone
      const primaryR = isDark ? 217 : 184;
      const primaryG = isDark ? 119 : 88;
      const primaryB = isDark ? 70 : 45;

      // Muted clay / sand secondary tone
      const secR = isDark ? 171 : 126;
      const secG = isDark ? 162 : 117;
      const secB = isDark ? 150 : 107;

      ctx.save();
      ctx.translate(displayX, displayY);

      // 1. Soft Faint Radial Ambient Halo (Warm terracotta wash)
      const haloRadius = 160;
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, haloRadius);
      gradient.addColorStop(0, `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${isDark ? 0.12 : 0.08})`);
      gradient.addColorStop(0.5, `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${isDark ? 0.04 : 0.025})`);
      gradient.addColorStop(1, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Outer Architectural Drafting Ring
      ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${isDark ? 0.22 : 0.16})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Degree Tick Marks on Outer Ring (every 45 degrees)
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const x1 = Math.cos(angle) * 76;
        const y1 = Math.sin(angle) * 76;
        const x2 = Math.cos(angle) * 84;
        const y2 = Math.sin(angle) * 84;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 3. Middle Dashed Drafting Orbit
      ctx.strokeStyle = `rgba(${secR}, ${secG}, ${secB}, ${isDark ? 0.20 : 0.14})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.arc(0, 0, 54, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Inner Fine Ring
      ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${isDark ? 0.20 : 0.15})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Hair-thin Cardinal Crosshair Rays
      ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${isDark ? 0.16 : 0.10})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(-105, 0);
      ctx.lineTo(-82, 0);
      ctx.moveTo(82, 0);
      ctx.lineTo(105, 0);
      ctx.moveTo(0, -105);
      ctx.lineTo(0, -82);
      ctx.moveTo(0, 82);
      ctx.lineTo(0, 105);
      ctx.stroke();

      // 6. Draw 3D Isometric Architectural Cube (Rotating & tilting with cursor)
      const projected = vertices.map(v => project3D(v[0], v[1], v[2], rotX, rotY, rotZ));

      // Draw Edges
      ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${isDark ? 0.36 : 0.26})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let edge of edges) {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // Draw subtle vertex nodes
      ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${isDark ? 0.45 : 0.35})`;
      for (let p of projected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Small center drafting crosshair
      ctx.strokeStyle = `rgba(${secR}, ${secG}, ${secB}, ${isDark ? 0.30 : 0.20})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.lineTo(4, 0);
      ctx.moveTo(0, -4);
      ctx.lineTo(0, 4);
      ctx.stroke();

      // Faint Architectural Detail Label
      ctx.fillStyle = `rgba(${secR}, ${secG}, ${secB}, ${isDark ? 0.32 : 0.22})`;
      ctx.font = "8px monospace";
      ctx.textAlign = "left";
      ctx.fillText("SPATIAL // 01", 88, 4);

      ctx.restore();

      if (!prefersReducedMotion) {
        requestAnimationFrame(render);
      }
    }

    if (prefersReducedMotion) {
      render(); // Single static render for reduced motion
    } else {
      requestAnimationFrame(render);
    }
  }

  // Initialize Hero Interactive Background
  initHeroInteractiveBackground();
});
