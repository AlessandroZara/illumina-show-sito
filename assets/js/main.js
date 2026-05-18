// Simple front-end login gate (SOFT, non sicuro)
(function () {
  const path = window.location.pathname;

  // controlla se siamo già sulla pagina di login
  const isLoginPage =
    path.endsWith("/pages/login.html") ||
    path.endsWith("login.html");

  // Non bloccare la pagina di login
  if (isLoginPage) return;

  const raw = localStorage.getItem("illuminaLogin");

  // Nessun login salvato -> vai al login
  if (!raw) {
    // usa un path assoluto relativo alla root del sito
    window.location.href = "/pages/login.html";
    return;
  }

  try {
    const data = JSON.parse(raw);
    const now = Date.now();

    const isValid =
      data &&
      data.loggedIn === true &&
      typeof data.expiresAt === "number" &&
      now < data.expiresAt;

    if (!isValid) {
      localStorage.removeItem("illuminaLogin");
      sessionStorage.removeItem("illuminaLoggedIn");
      window.location.href = "/pages/login.html";
    }
  } catch (e) {
    // Se qualcosa è corrotto, resetta e manda al login
    localStorage.removeItem("illuminaLogin");
    sessionStorage.removeItem("illuminaLoggedIn");
    window.location.href = "/pages/login.html";
  }
})();

// Main JS - Theme Toggle + Mobile Menu
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("illumina-theme");

  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";

      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("illumina-theme", newTheme);
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      nav.classList.toggle("is-open");

      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    });

    const navLinks = nav.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});