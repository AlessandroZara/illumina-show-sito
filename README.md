# Illumina Show – Sito di Prova (Static Prototype)

Prototipo statico del sito di **Illumina Show**, pensato per validare
grafica, struttura dei contenuti e tono di voce prima di sviluppare
la versione definitiva in WordPress, modificabile in autonomia da Luca.

Questo progetto serve come **demo completa**: Luca può vedere come
potrebbe presentarsi il sito ufficiale, navigare le sezioni principali
e valutare se layout, colori e testi rispecchiano davvero l’identità
di Illumina Show.

---

## Obiettivi del progetto

- Creare una **bozza realistica** del sito di Illumina Show, non un semplice wireframe.  
- Testare **layout**, **palette colori** e **tipografia** su più pagine.  
- Verificare che il tono sia coerente: intelligente, leggero, autoironico.  
- Preparare una base chiara da tradurre in **tema WordPress**.  

---

## Struttura del sito

Il sito è completamente statico (HTML/CSS/JS) e organizzato in più pagine:

- `index.html` – **Home**
  - Hero con payoff e CTA principale verso YouTube / ultimi episodi
  - Intro su cos’è Illumina Show
  - Evidenza di un episodio o format
  - Richiami a Live in Teatro e Dizionario
- `pages/episodi.html` – **Archivio Episodi**
  - Griglia di 8 episodi selezionati (studio + live), incorporati da YouTube  
  - Badge per distinguere “In studio”, “Live in teatro”, “Game Show”  
  - Pulsante giallo ben visibile: **“Guarda tutti i video su YouTube”**
- `pages/live.html` – **Live in Teatro**
  - Hero dedicato al tour nei teatri con CTA verso TicketOne
  - Blocco descrittivo “Cosa succede dal vivo?”
  - Micro–regole su dress code, offerte, rischi con tono ironico
  - Citazioni/quote per trasmettere l’atmosfera delle serate
- `pages/facce.html` – **Le facce**
  - Card dedicate ai personaggi ricorrenti (ospiti fissi, collettivi, ecc.)
  - Biografie brevi, con tono ironico ma chiaro
  - Esempi: Michele, Aoh! Studio, esperti vari…
- `pages/sponsor.html` – **Sponsor**
  - Spazio per raccontare lo storico della collaborazione con gli sponsor
  - Possibili blocchi per loghi, payoff e pacchetti di partnership
- `pages/dizionario.html` – **Dizionario di Illumina**
  - Riferimento al “doc di Illumina” scritto dalla community
  - Spiegazione del senso del dizionario (aiutare i nuovi a entrare nella lore)
- `pages/privacy-policy.html`, `pages/cookie-policy.html`
  - Placeholder per i contenuti legali definitivi

Cartelle principali:

- `assets/css/style.css` – stylesheet principale del progetto
- `assets/js/main.js` – logica base (toggle tema, menu mobile, piccole interazioni)
- `assets/images/` – logo e immagini di supporto

---

## Direzione visiva

### Palette colori

La palette si ispira al logo di Illumina Show:

- **Sfondo principale:** teal / petrolio scuro
- **Accento principale:** giallo caldo (usato per CTA e dettagli)
- **Neutrali chiari:** bianco caldo / avorio per testi e superfici
- **Neutrali scuri:** grigio–blu scuro per contrasti e testi su giallo

Scelte chiave:

- Colore neutro per gli sfondi, accento giallo usato **pochi ma buoni**:
  - pulsanti principali (es. “Guarda tutti i video su YouTube”),
  - badge o micro–elementi importanti.  
- Evitata la “rainbow palette”: pochi colori, usati con criterio.

### Tipografia

Font caricati da Fontshare:

- **Titoli / display:** `Cabinet Grotesk` (pesature alte, look deciso)
- **Testi / UI:** `Satoshi` (pulito, leggibile, moderno)

Regole di base:

- Corpo testo a 16–18px per leggibilità.
- Massimo 3–4 dimensioni di testo per pagina (niente caos tipografico).
- Titoli brevi e d’impatto, testi descrittivi corti e veloci da leggere.

### Layout

- **Griglia a colonne** con container centrale (`.container`) e padding generoso.
- Sezioni ben separate con spaziature regolari.
- Uso di card per:
  - episodi,
  - facce,
  - sponsor.
- Griglie episodi responsive:
  - 1 colonna su mobile,
  - 2 colonne su tablet/desktop.

---

## Tono di voce

Il tono cerca di replicare quello dello show:

- Non troppo formale, mai “aziendale”.
- Autoironico e complice con chi guarda:
  - “Puntate in studio, deliri in teatro e misteriose apparizioni di Dolmen.”
  - “Mettiamo il palco, voi mettete l’ansia a Luca.”
- Descrizioni degli episodi corte, con una riga di contesto + una riga di battuta.

Obiettivo: far capire in pochi secondi che Illumina Show è **un progetto serio**
sul piano produttivo, ma con contenuti volutamente leggeri e non istituzionali.

---

## Pagina Episodi – Dettagli

### Contenuto

- **Titolo sezione:** “Archivio Episodi”
- **Sottotitolo:** testo breve che introduce l’idea di mix fra studio e live.
- **8 episodi selezionati:**
  - Live con i preti
  - Supermercati valdostani
  - Proverbi locali
  - Game Show valdostano
  - Game Show con Don Jean-Claude
  - Debutto a Milano
  - Episodi recenti (“pollo pizza…”, “scene hot…”)

Ogni card contiene:

- embed YouTube (iframe),
- badge (es. “Live in teatro”, “In studio”, “Game Show”),
- titolo breve,
- descrizione rapida e ironica.

### Call to action finale

Alla fine della griglia, un pulsante giallo:

- Testo: **“Guarda tutti i video su YouTube”**
- Link: `https://www.youtube.com/@illuminashow/videos`
- Stile: pulsante a pillola, ben visibile, in palette Illumina.

---

## Funzionalità tecniche

### Tema chiaro/scuro

- Attributo `data-theme` su `<html>` (`light` / `dark`).
- Pulsante nella navbar per switchare tema.
- Colori e background basati su variabili CSS (`--color-*`).

### Navigazione

- Header fisso con:
  - logo,
  - menu principale,
  - toggle tema.
- Menu mobile con bottone “hamburger”.

### Responsività

- Layout pensato mobile–first:
  - griglie che si adattano da 1 a 2 colonne,
  - testo leggibile su schermi piccoli.
- Tutte le pagine testate concettualmente per desktop e mobile.

---

## Come usare questo prototipo

1. Aprire `index.html` in un browser (anche direttamente da file).
2. Navigare tra:
   - Home
   - Episodi
   - Live in Teatro
   - Le facce
   - Sponsor
   - Dizionario
3. Valutare:
   - struttura delle pagine,
   - tono dei testi,
   - leggibilità,
   - coerenza visiva.

---

## Prossimi passi (verso WordPress)

Una volta approvata questa bozza:

- Ricreare i layout principali come **template WordPress**:
  - Home (hero + sezioni),
  - Archivio episodi (query dinamica YouTube/Custom Post Type),
  - Live in teatro,
  - Le facce (Custom Post Type “Personaggio”?),
  - Sponsor.
- Rendere modificabili da backend:
  - testi di titoli, sottotitoli, descrizioni episodi,
  - episodi in evidenza,
  - card delle facce,
  - contenuti sponsor,
  - link esterni (YouTube, Spotify, TicketOne).
- Valutare un’integrazione più stretta con YouTube per popolare gli episodi.

---

## Scopo di questa versione

Questa versione serve principalmente a:

- **Far vedere a Luca**:
  - come potrebbe “respirare” il sito,
  - se la grafica è in linea con lo show,
  - se le scelte di contenuto (quali facce, quali episodi, quali testi) funzionano.
- Raccogliere feedback mirati su:
  - cosa tenere,
  - cosa cambiare,
  - cosa rafforzare nella versione WordPress definitiva.

Una volta ricevuta l’approvazione, questo prototipo diventerà
la base di lavoro per il tema WordPress ufficiale di Illumina Show.