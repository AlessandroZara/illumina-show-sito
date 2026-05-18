// ATTENZIONE: questo è solo un gate "soft", NON sicurezza reale.
// Qui le credenziali sono hardcoded lato client solo per demo.

const VALID_USER = "luca";          // copia dal tuo .env
const VALID_PASS = "illumina2026";  // copia dal tuo .env

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorEl = document.getElementById("login-error");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === VALID_USER && password === VALID_PASS) {
      const now = Date.now();
      const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

      const loginData = {
        loggedIn: true,
        expiresAt: now + oneWeekMs
      };

      // Ricorda il login per 1 settimana
      localStorage.setItem("illuminaLogin", JSON.stringify(loginData));
      // opzionale: mantieni anche questo flag per compatibilità
      sessionStorage.setItem("illuminaLoggedIn", "true");

      // Vai alla home del prototipo (pages/index.html)
      window.location.href = "../../pages/index.html";
    } else {
      errorEl.style.display = "block";
    }
  });
});