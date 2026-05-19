// Main JS - Theme Toggle + Mobile Menu
// Questo file gestisce:
// - il toggle del tema (light/dark) con salvataggio in localStorage
// - il menu mobile (apertura/chiusura e stato ARIA)

/*
 NOTE PER LA RIMOZIONE DEL SISTEMA DI LOGIN "SOFT":

 - Eliminare il file login.html (la pagina di login)
 - Eliminare il file login.js (la logica di autenticazione finta)
 - Eliminare eventuali riferimenti a "illuminaLogin" e "illuminaLoggedIn"
   se erano usati altrove (con questo main.js non vengono più letti)
 - Pulire eventuali link che puntavano alla pagina di login (se presenti per test)

 Opzionale:
 - Se vuoi tenere una versione con e una senza login:
   - rinomina il vecchio main.js con login in "main.with-login.js"
   - mantieni questo file e rinominalo come "main.js" 
*/

document.addEventListener("DOMContentLoaded", () => {
  // Bottone per cambiare tema (se presente nel DOM)
  const themeToggle = document.getElementById("theme-toggle");

  // Bottone del menu mobile (hamburger)
  const navToggle = document.querySelector(".nav-toggle");

  // Contenitore della navigazione principale
  const nav = document.querySelector(".nav");

  // Riferimento all'elemento root (html) per il data-theme
  const root = document.documentElement;

  // 1) THEME: recupero del tema salvato
  const savedTheme = localStorage.getItem("illumina-theme");

  if (savedTheme) {
    // Se esiste un tema salvato, applicalo
    root.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Altrimenti, se l'utente preferisce il dark mode a livello di sistema, usalo
    root.setAttribute("data-theme", "dark");
  }

  // 2) THEME: gestione del tasto di toggle (light/dark)
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";

      // Applica il nuovo tema
      root.setAttribute("data-theme", newTheme);

      // Salva la scelta dell'utente
      localStorage.setItem("illumina-theme", newTheme);
    });
  }

  // 3) NAV: gestione del menu mobile
  if (navToggle && nav) {
    // Click sull'hamburger -> apre/chiude il menu
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      nav.classList.toggle("is-open");

      // Aggiorna lo stato ARIA per accessibilità
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    });

    // Chiudi il menu quando clicchi su un link di navigazione
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