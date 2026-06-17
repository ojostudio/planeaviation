/* ================================================================
   1. CONFIGURAÇÃO GERAL
   ================================================================ */
const SITE_LANG = getLang();

/* SVG da setinha ( Asset 3.svg ) */
const SVG_ARROW = `<svg viewBox="0 0 24.68 24.68" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0 0 2 21.26 2 0 23.26 1.42 24.67 22.68 3.41 22.68 24.68 24.68 24.68 24.68 0 0 0"/></svg>`;

function t(key){
  if(window.PA_I18N && PA_I18N.t){
    return PA_I18N.t(key);
  }
  return key; // Fallback
}

function getLang(){
  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get('lang');
  if(!lang){
    lang = localStorage.getItem('paLang') || 'pt';
  }
  return lang;
}

const LOGO_DARK = `<img src="img/logo-plane.svg" alt="Plane Aviation Logo">`;
const LOGO_LIGHT = `<img src="img/logo-plane-white.svg" alt="Plane Aviation Logo">`;

const NAV_LINKS = [
  { key: "nav_cirrus", href: "universo-cirrus.html" },
  { key: "nav_stock", href: "aeronaves.html" },
  { key: "nav_services", href: "servicos.html" },
  { key: "nav_news", href: "news.html" },
  { key: "nav_about", href: "sobre.html" }
];

function navHTML(){
  const langQuery = SITE_LANG === 'pt' ? '' : `?lang=${SITE_LANG}`;
  return NAV_LINKS.map(link => `
    <a href="${link.href}${langQuery}" data-i18n="${link.key}">
      ${t(link.key)}
    </a>
  `).join("");
}

function langSelector(){
  const otherLang = SITE_LANG === 'pt' ? 'en' : 'pt';
  const label = SITE_LANG === 'pt' ? 'EN' : 'PT';
  const flag = SITE_LANG === 'pt' ? '🇺🇸' : '🇧🇷';
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('lang', otherLang);
  
  return `<a href="${currentUrl.href}" class="lang-sel" onclick="localStorage.setItem('paLang', '${otherLang}')">
    ${flag} ${label}
  </a>`;
}

/* ================================================================
   2. INJEÇÃO DE COMPONENTES (HEADER/FOOTER)
   ================================================================ */
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
      <a href="contato.html" class="btn btn-solid btn-xs">
        <span data-i18n="nav_cta">${t("nav_cta")}</span>
        ${SVG_ARROW}
      </a>
    </div>
    <button class="hd-toggle" id="menuToggle" aria-label="Abrir menu" aria-expanded="false">
      <svg class="icon i-5" viewBox="0 0 24 24" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>
  </div>
</header>
<div class="mobile-nav" id="mobileNav" aria-hidden="true">
  <nav aria-label="Mobile">${navHTML()}</nav>
  ${langSelector()}
  <a href="contato.html" class="btn btn-solid btn-sm">
    <span data-i18n="nav_cta">${t("nav_cta")}</span>
    ${SVG_ARROW}
  </a>
</div>`;

/* ---- FOOTER ---- */
const footer = `
<footer class="site" role="contentinfo">
  <div class="container ft-row">
    <a href="index.html" class="logo" aria-label="Plane Aviation — Home">
      ${LOGO_LIGHT}
    </a>
    <nav class="ft-nav" aria-label="Navegação do rodapé">${navHTML()}</nav>
    <p class="copy">© Plane Aviation. ${t("footer_copy")}</p>
  </div>
</footer>`;

// Função para injetar
function inject(){
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if(headerEl) headerEl.innerHTML = header;
  if(footerEl) footerEl.innerHTML = footer;
}

inject();

/* ================================================================
   3. INTERAÇÕES E ANIMAÇÕES
   ================================================================ */
const menuToggle = document.getElementById("menuToggle");
const mobileNav  = document.getElementById("mobileNav");

if(menuToggle && mobileNav){
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    mobileNav.setAttribute("aria-hidden", isExpanded);
    mobileNav.classList.toggle("open");
    // Opcional: trava o scroll do body
    document.body.classList.toggle("no-scroll");
  });
}