(function () {
  "use strict";

  /* ---- Falling Leaves ---- */
  const leafContainer = document.getElementById("leaf-container");
  const leafColors = ["#4ade80", "#86efac", "#ca8a04", "#65a30d", "#a3e635", "#fbbf24"];
  const leafCount = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 18;

  function createBinaryChar(color) {
    const char = Math.random() > 0.5 ? "1" : "0";
    return `<span style="color: ${color}; font-family: monospace; font-size: 100%; font-weight: bold; opacity: 0.8;">${char}</span>`;
  }

  function spawnLeaves() {
    if (!leafContainer || leafCount === 0) return;

    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.className = "leaf";
      leaf.innerHTML = createBinaryChar(leafColors[i % leafColors.length]);

      const size = 14 + Math.random() * 18;
      const left = Math.random() * 100;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 15;

      leaf.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      leafContainer.appendChild(leaf);
    }
  }

  spawnLeaves();

  /* ---- Navbar Scroll ---- */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("back-to-top");

  function onScroll() {
    const scrolled = window.scrollY > 20;
    navbar?.classList.toggle("scrolled", scrolled);

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.removeAttribute("hidden");
      } else {
        backToTop.setAttribute("hidden", "");
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile Menu ---- */
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    if (mobileMenu) {
      if (isOpen) {
        mobileMenu.removeAttribute("hidden");
      } else {
        mobileMenu.setAttribute("hidden", "");
      }
    }
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.classList.remove("active");
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "Open menu");
      mobileMenu?.setAttribute("hidden", "");
    });
  });

  /* ---- Back to Top ---- */
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---- Scroll Reveal ---- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---- Skill Bar Animation ---- */
  const skillItems = document.querySelectorAll(".skill-item");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const level = item.getAttribute("data-level");
          item.style.setProperty("--level", level + "%");
          item.classList.add("animated");
          skillObserver.unobserve(item);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillItems.forEach((item) => skillObserver.observe(item));

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `Message Sent! <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  });

  /* ---- Footer Year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Smooth active nav highlight ---- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .footer-nav a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.style.color =
              link.getAttribute("href") === `#${id}` ? "var(--text)" : "";
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
})();
