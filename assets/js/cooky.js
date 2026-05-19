// Cookie banner + preferenze (consenso valido 14 giorni)

async function injectCookieBanner() {
  try {
    // Percorso del file HTML del banner rispetto alla root del sito
    const response = await fetch("/assets/partials/cookie-banner.html");
    if (!response.ok) return;

    const html = await response.text();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    // Appendiamo tutti i nodi (banner + modal) in fondo al body
    while (wrapper.firstChild) {
      document.body.appendChild(wrapper.firstChild);
    }
  } catch (e) {
    console.error("Impossibile caricare il banner cookie", e);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Inietto il markup del banner/modal
  await injectCookieBanner();

  // 2) Recupero i riferimenti ora che il markup è nel DOM
  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("cookie-modal");

  if (!banner || !modal) return;

  const btnAcceptAll = document.getElementById("cookie-accept-all");
  const btnRejectAll = document.getElementById("cookie-reject-all");
  const btnSettings = document.getElementById("cookie-settings");
  const chkStats = document.getElementById("cookie-consent-statistics");
  const chkMarketing = document.getElementById("cookie-consent-marketing");
  const btnModalSave = document.getElementById("cookie-modal-save");
  const btnModalCancel = document.getElementById("cookie-modal-cancel");

  const CONSENT_KEY = "illumina-cookie-consent";
  const CONSENT_TTL_DAYS = 14;

  function getExpiryTimestamp() {
    const now = Date.now();
    const ttlMs = CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000;
    return now + ttlMs;
  }

  function loadConsent() {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    try {
      const data = JSON.parse(raw);
      if (!data || typeof data.expiresAt !== "number") return null;

      const now = Date.now();
      if (now > data.expiresAt) {
        // Consenso scaduto
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  function saveConsent(consent) {
    const withExpiry = {
      ...consent,
      expiresAt: getExpiryTimestamp()
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(withExpiry));
  }

  function applyConsent(consent) {
    // Punto di aggancio per script futuri (analytics, embed, ecc.)
    // Esempio:
    // if (!consent.statistics) disabilitaAnalytics();
    // if (!consent.marketing) blocca script terze parti non essenziali;
  }

  function showBanner() {
    banner.classList.add("is-visible");
    banner.setAttribute("aria-hidden", "false");
  }

  function hideBanner() {
    banner.classList.remove("is-visible");
    banner.setAttribute("aria-hidden", "true");
  }

  function showModal() {
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
  }

  function hideModal() {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
  }

  // 3) Inizializza stato dai dati salvati
  const existing = loadConsent();
  if (existing) {
    chkStats.checked = !!existing.statistics;
    chkMarketing.checked = !!existing.marketing;
    applyConsent(existing);
  } else {
    showBanner();
  }

  // 4) Event handlers

  // Accetta tutto
  btnAcceptAll.addEventListener("click", () => {
    const consent = {
      necessary: true,
      statistics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };

    chkStats.checked = true;
    chkMarketing.checked = true;

    saveConsent(consent);
    applyConsent(consent);
    hideBanner();
    hideModal();
  });

  // Rifiuta tutto
  btnRejectAll.addEventListener("click", () => {
    const consent = {
      necessary: true,
      statistics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };

    chkStats.checked = false;
    chkMarketing.checked = false;

    saveConsent(consent);
    applyConsent(consent);
    hideBanner();
    hideModal();
  });

  // Apri preferenze
  btnSettings.addEventListener("click", () => {
    hideBanner();
    showModal();
  });

  // Salva preferenze dal modal
  btnModalSave.addEventListener("click", () => {
    const consent = {
      necessary: true,
      statistics: chkStats.checked,
      marketing: chkMarketing.checked,
      timestamp: new Date().toISOString()
    };

    saveConsent(consent);
    applyConsent(consent);
    hideModal();
    hideBanner();
  });

  // Annulla preferenze
  btnModalCancel.addEventListener("click", () => {
    hideModal();
    if (!loadConsent()) {
      showBanner();
    }
  });
});