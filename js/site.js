/* ================================================================
   site.js — Plane Aviation
   Injeta header + footer em todas as páginas.
   Depende de i18n.js (deve ser carregado antes deste arquivo).
   ================================================================ */
(function () {

  /* ---- Identificação da página atual ---- */
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* ---- Logos inline (SVG) ---- */
  /* Logo escura: texto preto + traço vermelho — usar em fundos claros (header) */
  const LOGO_DARK  = `<svg viewBox="0 0 1920 459.95" xmlns="http://www.w3.org/2000/svg" style="height:36px;width:auto;display:block"><g> <path d="M61.85,395.81l-12.03,60.13H0l37.8-188.41h84.18c12.03,0,22.19,1.77,30.5,5.3,8.3,3.54,14.79,8.31,19.47,14.32,4.67,6.02,7.73,12.93,9.16,20.76s1.29,16.03-.43,24.62c-1.72,8.59-4.82,16.71-9.31,24.34-4.49,7.64-10.31,14.32-17.47,20.04-7.16,5.73-15.56,10.3-25.2,13.74-9.64,3.43-20.47,5.15-32.5,5.15h-34.36ZM78.46,313.34l-7.73,38.66h34.36c6.68,0,12.5-1.58,17.47-4.73,4.96-3.15,8.11-8.06,9.45-14.75,1.53-6.68.38-11.55-3.44-14.6-3.82-3.05-9.07-4.58-15.75-4.58h-34.36Z"/> <path d="M277.71,455.94h-109.6l37.8-188.41h49.82l-28.63,142.59h59.78l-9.16,45.81Z"/> <path d="M383.9,267.53h55.83l32.36,188.41h-50.68l-5.15-30.06h-67.29l-17.18,30.06h-55.83l107.95-188.41ZM371.88,385.79h37.8l-6.3-62.13h-.57l-30.92,62.13Z"/> <path d="M509.92,267.53h51.25l54.12,106.23,21.19-106.23h50.39l-37.51,188.41h-48.68l-55.26-114.53-23.19,114.53h-50.11l37.8-188.41Z"/> <path d="M813.77,455.94h-145.45l37.8-188.41h144.02l-8.88,44.67h-94.49l-5.44,27.77h90.19l-8.59,42.95h-90.2l-5.73,28.34h95.64l-8.88,44.67Z"/> <path d="M945.52,267.53h19.76l39.51,188.41h-17.75l-9.16-44.95h-99.93l-27.77,44.95h-19.76l115.1-188.41ZM887.96,394.66h86.47l-22.05-105.37h-.28l-64.14,105.37Z"/> <path d="M1005.87,267.53h17.75l27.49,165.5h.57l93.63-165.5h19.75l-106.51,188.41h-20.9l-31.79-188.41Z"/> <path d="M1162.35,455.94h-17.75l37.8-188.41h17.75l-37.8,188.41Z"/> <path d="M1292.6,267.53h19.76l39.52,188.41h-17.75l-9.16-44.95h-99.93l-27.77,44.95h-19.76l115.1-188.41ZM1235.05,394.66h86.47l-22.05-105.37h-.29l-64.13,105.37Z"/> <path d="M1487.79,283.85h-61.56l-34.64,172.09h-17.47l34.36-172.09h-62.42l3.43-16.32h141.74l-3.44,16.32Z"/> <path d="M1491.97,455.94h-17.75l37.79-188.41h17.75l-37.8,188.41Z"/> <path d="M1538.81,362.02c2.67-13.55,7.78-26.29,15.32-38.22,7.54-11.93,16.61-22.34,27.2-31.21,10.59-8.88,22.28-15.89,35.07-21.04,12.79-5.16,25.87-7.73,39.23-7.73s25.39,2.57,36.08,7.73c10.69,5.15,19.56,12.17,26.63,21.04,7.06,8.88,11.93,19.28,14.61,31.21,2.67,11.93,2.67,24.67,0,38.22-2.68,13.36-7.74,26.01-15.18,37.94-7.45,11.93-16.46,22.33-27.05,31.21-10.59,8.88-22.29,15.89-35.08,21.04-12.79,5.15-25.87,7.73-39.23,7.73s-25.39-2.58-36.07-7.73c-10.69-5.15-19.57-12.17-26.63-21.04-7.06-8.88-11.98-19.28-14.74-31.21-2.77-11.93-2.82-24.57-.14-37.94ZM1555.99,362.6c-2.29,11.07-2.29,21.47,0,31.21,2.29,9.73,6.31,18.23,12.03,25.49,5.73,7.25,12.98,12.98,21.76,17.18,8.78,4.2,18.61,6.3,29.49,6.3s21.62-2.14,32.21-6.44c10.59-4.29,20.28-10.07,29.06-17.32,8.78-7.25,16.27-15.84,22.48-25.77,6.2-9.93,10.45-20.43,12.74-31.5,2.29-11.26,2.34-21.76.14-31.5s-6.16-18.28-11.88-25.63c-5.73-7.35-12.99-13.13-21.76-17.32-8.78-4.19-18.61-6.3-29.49-6.3s-21.91,2.15-32.5,6.45c-10.59,4.29-20.28,10.12-29.06,17.47-8.78,7.35-16.27,15.99-22.48,25.91-6.2,9.93-10.45,20.52-12.74,31.79Z"/> <path d="M1772.25,267.53h18.33l79.59,161.21,32.36-161.21h17.47l-37.51,188.41h-18.32l-79.6-161.49-32.35,161.49h-17.75l37.79-188.41Z"/> </g> <path fill="#dc0000" d="M351.95,0s18.82,44.01,60.49,140.68c37.7,87.45,97.97,93.92,121.87,93.92h331.66c9.55,0,9.68-13.01,0-13.01-155.54,0-252.24-84.42-305.59-169.47C541.9,22.67,502.22,0,469.15,0c-122.93,0-117.2,0-117.2,0h0Z"/></svg>`;
  /* Logo clara: texto branco + traço vermelho — usar em fundos escuros (footer) */
  const LOGO_LIGHT = `<svg viewBox="0 0 1920 459.95" xmlns="http://www.w3.org/2000/svg" style="height:36px;width:auto;display:block"><g> <path fill="#ffffff" d="M61.85,395.81l-12.03,60.13H0l37.8-188.41h84.18c12.03,0,22.19,1.77,30.5,5.3,8.3,3.54,14.79,8.31,19.47,14.32,4.67,6.02,7.73,12.93,9.16,20.76,1.43,7.83,1.29,16.03-.43,24.62-1.72,8.59-4.82,16.71-9.31,24.34-4.49,7.64-10.31,14.32-17.47,20.04-7.16,5.73-15.56,10.3-25.2,13.74-9.64,3.43-20.47,5.15-32.5,5.15h-34.36ZM78.46,313.34l-7.73,38.66h34.36c6.68,0,12.5-1.58,17.47-4.73,4.96-3.15,8.11-8.06,9.45-14.75,1.53-6.68.38-11.55-3.44-14.6-3.82-3.05-9.07-4.58-15.75-4.58h-34.36Z"/> <path fill="#ffffff" d="M277.71,455.94h-109.6l37.8-188.41h49.82l-28.63,142.59h59.78l-9.16,45.81Z"/> <path fill="#ffffff" d="M383.9,267.53h55.83l32.36,188.41h-50.68l-5.15-30.06h-67.29l-17.18,30.06h-55.83l107.95-188.41ZM371.88,385.79h37.8l-6.3-62.13h-.57l-30.92,62.13Z"/> <path fill="#ffffff" d="M509.92,267.53h51.25l54.12,106.23,21.19-106.23h50.39l-37.51,188.41h-48.68l-55.26-114.53-23.19,114.53h-50.11l37.8-188.41Z"/> <path fill="#ffffff" d="M813.77,455.94h-145.45l37.8-188.41h144.02l-8.88,44.67h-94.49l-5.44,27.77h90.19l-8.59,42.95h-90.2l-5.73,28.34h95.64l-8.88,44.67Z"/> <path fill="#ffffff" d="M945.52,267.53h19.76l39.51,188.41h-17.75l-9.16-44.95h-99.93l-27.77,44.95h-19.76l115.1-188.41ZM887.96,394.66h86.47l-22.05-105.37h-.28l-64.14,105.37Z"/> <path fill="#ffffff" d="M1005.87,267.53h17.75l27.49,165.5h.57l93.63-165.5h19.75l-106.51,188.41h-20.9l-31.79-188.41Z"/> <path fill="#ffffff" d="M1162.35,455.94h-17.75l37.8-188.41h17.75l-37.8,188.41Z"/> <path fill="#ffffff" d="M1292.6,267.53h19.76l39.52,188.41h-17.75l-9.16-44.95h-99.93l-27.77,44.95h-19.76l115.1-188.41ZM1235.05,394.66h86.47l-22.05-105.37h-.29l-64.13,105.37Z"/> <path fill="#ffffff" d="M1487.79,283.85h-61.56l-34.64,172.09h-17.47l34.36-172.09h-62.42l3.43-16.32h141.74l-3.44,16.32Z"/> <path fill="#ffffff" d="M1491.97,455.94h-17.75l37.79-188.41h17.75l-37.8,188.41Z"/> <path fill="#ffffff" d="M1538.81,362.02c2.67-13.55,7.78-26.29,15.32-38.22,7.54-11.93,16.61-22.34,27.2-31.21,10.59-8.88,22.28-15.89,35.07-21.04,12.79-5.16,25.87-7.73,39.23-7.73s25.39,2.57,36.08,7.73c10.69,5.15,19.56,12.17,26.63,21.04,7.06,8.88,11.93,19.28,14.61,31.21,2.67,11.93,2.67,24.67,0,38.22-2.68,13.36-7.74,26.01-15.18,37.94-7.45,11.93-16.46,22.33-27.05,31.21-10.59,8.88-22.29,15.89-35.08,21.04-12.79,5.15-25.87,7.73-39.23,7.73s-25.39-2.58-36.07-7.73c-10.69-5.15-19.57-12.17-26.63-21.04-7.06-8.88-11.98-19.28-14.74-31.21-2.77-11.93-2.82-24.57-.14-37.94ZM1555.99,362.6c-2.29,11.07-2.29,21.47,0,31.21,2.29,9.73,6.31,18.23,12.03,25.49,5.73,7.25,12.98,12.98,21.76,17.18,8.78,4.2,18.61,6.3,29.49,6.3s21.62-2.14,32.21-6.44c10.59-4.29,20.28-10.07,29.06-17.32,8.78-7.25,16.27-15.84,22.48-25.77,6.2-9.93,10.45-20.43,12.74-31.5,2.29-11.26,2.34-21.76.14-31.5s-6.16-18.28-11.88-25.63c-5.73-7.35-12.99-13.13-21.76-17.32-8.78-4.19-18.61-6.3-29.49-6.3s-21.91,2.15-32.5,6.45c-10.59,4.29-20.28,10.12-29.06,17.47-8.78,7.35-16.27,15.99-22.48,25.91-6.2,9.93-10.45,20.52-12.74,31.79Z"/> <path fill="#ffffff" d="M1772.25,267.53h18.33l79.59,161.21,32.36-161.21h17.47l-37.51,188.41h-18.32l-79.6-161.49-32.35,161.49h-17.75l37.79-188.41Z"/> </g> <path fill="#dc0000" d="M351.95,0s18.82,44.01,60.49,140.68c37.7,87.45,97.97,93.92,121.87,93.92h331.66c9.55,0,9.68-13.01,0-13.01-155.54,0-252.24-84.42-305.59-169.47C541.9,22.67,502.22,0,469.15,0c-122.93,0-117.2,0-117.2,0h0Z"/></svg>`;

  /* ---- Helper de tradução (aguarda i18n.js estar pronto) ---- */
  function t(key){ return window.PA_I18N ? PA_I18N.t(key) : key; }

  /* ---- Links de navegação ---- */
  const NAV = [
    { key:"nav_aircraft", href:"aeronaves.html" },
    { key:"nav_cirrus",   href:"universo-cirrus.html" },
    { key:"nav_services", href:"servicos.html" },
    { key:"nav_about",    href:"sobre.html" },
    { key:"nav_contact",  href:"contato.html" },
  ];

  function navHTML(){
    return NAV.map(l => {
      const active = l.href === page ? " active" : "";
      // data-i18n garante re-tradução quando idioma muda
      return `<a href="${l.href}" class="${active.trim()}" data-i18n="${l.key}">${t(l.key)}</a>`;
    }).join("");
  }

  /* ---- Seletor de idioma ---- */
  function langSelector(ctx=""){
    const lang = window.PA_I18N ? PA_I18N.getLang() : "pt";
    const label = lang.toUpperCase();
    return `<div class="lang-selector ${ctx}" role="navigation" aria-label="Idioma">
      <button class="lang-current" aria-haspopup="listbox" aria-expanded="false">
        ${label}
        <svg style="width:.625rem;height:.625rem;stroke:currentColor;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;margin-left:.25rem" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="lang-dropdown" role="listbox">
        <button class="lang-opt${lang==="pt"?" sel":""}" data-lang="pt" role="option">PT — Português</button>
        <button class="lang-opt${lang==="en"?" sel":""}" data-lang="en" role="option">EN — English</button>
        <button class="lang-opt${lang==="es"?" sel":""}" data-lang="es" role="option">ES — Español</button>
      </div>
    </div>`;
  }

  /* ---- HEADER ---- */
  const header = `
<header class="site" role="banner">
  <div class="hd-row">
    <a href="index.html" class="logo" aria-label="Plane Aviation — Home">
      ${LOGO_DARK}
    </a>
    <nav class="nav" aria-label="Principal">${navHTML()}</nav>
    <div class="hd-actions">
      ${langSelector()}
      <a href="contato.html" class="btn btn-solid btn-xs" data-i18n="nav_cta">${t("nav_cta")} <svg viewBox="0 0 24.68 24.68" xmlns="http://www.w3.org/2000/svg" style="width:1em;height:1em;flex-shrink:0;fill:currentColor;display:inline-block;vertical-align:middle;margin-left:.25rem"><polygon points="0 0 0 2 21.26 2 0 23.26 1.42 24.67 22.68 3.41 22.68 24.68 24.68 24.68 24.68 0 0 0"/></svg></a>
    </div>
    <button class="hd-toggle" id="menuToggle" aria-label="Abrir menu" aria-expanded="false">
      <svg class="icon i-5" viewBox="0 0 24 24" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>
  </div>
</header>
<div class="mobile-nav" id="mobileNav" aria-hidden="true">
  <nav aria-label="Mobile">${navHTML()}</nav>
  ${langSelector()}
  <a href="contato.html" class="btn btn-solid btn-sm" data-i18n="nav_cta">${t("nav_cta")}</a>
</div>`;

  /* ---- Links do footer ---- */
  const FOOTER_LINKS = [
    { key:"nav_aircraft",  href:"aeronaves.html" },
    { key:"uc_title",      href:"universo-cirrus.html" },
    { key:"cfg_title",     href:"https://plane-configurator-kappa.vercel.app/" },
    { key:"sobre_title",   href:"sobre.html" },
    { key:"svc_title",     href:"servicos.html" },
    { key:"news_title",    href:"news.html" },
    { key:"f_sell",        href:"contato.html?motivo=vender" },
  ];

/* ---- FOOTER ---- */
  const footer = `
<footer class="site" role="contentinfo">
  <div class="container">
    <div class="f-grid">
      <div>
        <div class="f-logo f-logo-lg">
          <a href="index.html" aria-label="Plane Aviation">${LOGO_LIGHT}</a>
        </div>
      </div>
      <div class="f-col">
        <h4 data-i18n="f_nav">${t("f_nav")}</h4>
        <nav>
          ${FOOTER_LINKS.map(l => `<a href="${l.href}" data-i18n="${l.key}">${t(l.key)}</a>`).join("")}
          <a href="contato.html" class="last" data-i18n="f_consultant">${t("f_consultant")}</a>
        </nav>
      </div>
      <div class="f-col f-contact">
        <h4 data-i18n="f_contact">${t("f_contact")}</h4>
        <p style="margin-bottom: 0.15rem;">Hangar Plane Aviation</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=Plane+Aviation,+R.+Emílio+Antonon,+771+-+Chácara+Aeroporto,+Jundiaí+-+SP,+13212-010" target="_blank" rel="noopener noreferrer">
          R. Emílio Antonon, 771<br>
          Chácara Aeroporto, Jundiaí - SP<br>
          13212-010
        </a>
        <a href="mailto:contato@planeaviation.com.br">contato@planeaviation.com.br</a>
        <a href="https://wa.me/551145826144" target="_blank" rel="noopener noreferrer">+55 11 4582-6144</a>
        
        <div class="f-social">
          <a href="https://www.instagram.com/_planeaviation/" target="_blank" rel="noopener" class="f-social-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/plane-aviation/" target="_blank" rel="noopener" class="f-social-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.youtube.com/@CirrusaircraftBrasil" target="_blank" rel="noopener" class="f-social-link" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9"/></svg>
          </a>
        </div>
      </div>
      <div class="f-col f-news">
        <h4 data-i18n="f_newsletter">${t("f_newsletter")}</h4>
        <p data-i18n="f_newsletter_p">${t("f_newsletter_p")}</p>
        <div class="f-news-row">
          <input type="email" id="footerNewsEmail" data-i18n="f_newsletter_ph" placeholder="${t("f_newsletter_ph")}">
          <button id="footerNewsBtn" data-i18n="f_newsletter_btn">${t("f_newsletter_btn")}</button>
        </div>
        <div class="f-cirrus-block">
          <img src="images/cirrus-badge.svg" alt="Cirrus Authorized" class="f-cirrus-seal">
          <span data-i18n="f_partner">${t("f_partner")}</span>
          <p class="f-desc" data-i18n="f_desc">${t("f_desc")}</p>
        </div>
      </div>
    </div>
    <div class="f-bottom">
      <p data-i18n="f_copyright">${t("f_copyright")}</p>
      ${langSelector()}
    </div>
  </div>
</footer>`;

  /* ---- Injeta header e footer ---- */
  const hEl = document.getElementById("site-header");
  const fEl = document.getElementById("site-footer");
  if (hEl) hEl.outerHTML = header;
  if (fEl) fEl.outerHTML = footer;

  /* ---- Menu mobile ---- */
  const toggle    = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    let open = false;
    const ICON_MENU  = `<svg class="icon i-5" viewBox="0 0 24 24" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
    const ICON_CLOSE = `<svg class="icon i-5" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    toggle.addEventListener("click", () => {
      open = !open;
      mobileNav.classList.toggle("open", open);
      toggle.classList.toggle("active", open);
      toggle.innerHTML   = open ? ICON_CLOSE : ICON_MENU;
      toggle.setAttribute("aria-expanded", String(open));
      mobileNav.setAttribute("aria-hidden", String(!open));
    });
  }

  /* ---- Seletor de idioma — delegação de evento ---- */
  document.addEventListener("click", (e) => {
    // Toggle dropdown
    const cur = e.target.closest(".lang-current");
    if(cur){
      const sel = cur.closest(".lang-selector");
      const wasOpen = sel.classList.contains("open");
      document.querySelectorAll(".lang-selector.open").forEach(s => s.classList.remove("open"));
      if(!wasOpen) sel.classList.add("open");
      return;
    }
    // Pick language
    const opt = e.target.closest(".lang-opt");
    if(opt && opt.dataset.lang && window.PA_I18N){
      PA_I18N.setLang(opt.dataset.lang);
      document.querySelectorAll(".lang-selector.open").forEach(s => s.classList.remove("open"));
      // Update current label
      document.querySelectorAll(".lang-current").forEach(b => {
        const labelNode = b.childNodes[0];
        if(labelNode) labelNode.textContent = opt.dataset.lang.toUpperCase()+" ";
      });
      // Update sel class
      document.querySelectorAll(".lang-opt").forEach(o => o.classList.toggle("sel", o.dataset.lang===opt.dataset.lang));
      return;
    }
    // Click outside — close all
    if(!e.target.closest(".lang-selector")){
      document.querySelectorAll(".lang-selector.open").forEach(s => s.classList.remove("open"));
    }
  });

  /* ---- Re-aplica traduções no header/footer quando idioma muda ---- */
  document.addEventListener("pa:langchange", () => {
    if (window.PA_I18N) PA_I18N.applyLang();
  });

  /* ---- Lógica da Newsletter do Footer ---- */
  document.addEventListener("click", async (e) => {
    if (e.target.id === "footerNewsBtn") {
      if (!window.PA || !PA.configured) return alert("Erro de conexão com o banco de dados.");
      
      const emailInput = document.getElementById("footerNewsEmail");
      const email = emailInput.value.trim();
      if (!email || !email.includes("@")) return alert("Por favor, insira um e-mail válido.");
      
      const btn = e.target;
      const originalText = btn.textContent;
      btn.textContent = "Aguarde...";
      btn.disabled = true;
      
      try {
        await PA.db.collection("newsletter").add({
          email: email,
          source: "footer",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Inscrição realizada com sucesso! Bem-vindo(a) à nossa newsletter.");
        emailInput.value = "";
      } catch (err) {
        alert("Ops! Houve um erro ao se inscrever: " + err.message);
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }
  });


})();
/* ---- Proteção básica de imagens (Desativa clique direito) ---- */
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('hero-bg')) {
      e.preventDefault();
    }
  });