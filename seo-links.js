/* ============================================================
   seo-links.js — resolve o link certo para uma aeronave/artigo.
   Usa o manifesto (id → slug) que o gerador de páginas estáticas
   escreve em aeronaves/index.json e artigos/index.json. Se o
   manifesto ainda não tiver aquele id (aeronave/artigo muito
   recente, gerador ainda não rodou), cai de volta pro link
   antigo (?id=), que sempre funciona.
   ============================================================ */
window.PA_LINKS = (function () {
  let aircraftMap = null;
  let articleMap = null;

  async function loadAircraftMap() {
    if (aircraftMap) return aircraftMap;
    try {
      const r = await fetch("aeronaves/index.json", { cache: "no-store" });
      aircraftMap = r.ok ? await r.json() : {};
    } catch (e) {
      aircraftMap = {};
    }
    return aircraftMap;
  }

  async function loadArticleMap() {
    if (articleMap) return articleMap;
    try {
      const r = await fetch("artigos/index.json", { cache: "no-store" });
      articleMap = r.ok ? await r.json() : {};
    } catch (e) {
      articleMap = {};
    }
    return articleMap;
  }

  function aircraftUrl(id) {
    return aircraftMap && aircraftMap[id] ? `aeronaves/${aircraftMap[id]}/` : `aeronave.html?id=${id}`;
  }

  function articleUrl(id) {
    return articleMap && articleMap[id] ? `artigos/${articleMap[id]}/` : `artigo.html?id=${id}`;
  }

  return { loadAircraftMap, loadArticleMap, aircraftUrl, articleUrl };
})();
