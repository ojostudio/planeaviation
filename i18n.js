/* ================================================================
   i18n.js — Plane Aviation
   Sistema de internacionalização (PT / EN / ES).

   COMO USAR:
   - Textos estáticos: adicione data-i18n="chave" no elemento HTML.
   - Textos em JS: use PA_I18N.t("chave").
   - Para adicionar um idioma: copie o bloco de um idioma existente
     e crie as traduções para a nova língua.

   COMO EDITAR TRADUÇÕES:
   - Cada entrada é um objeto { pt:"...", en:"...", es:"..." }.
   - Edite apenas os valores entre aspas — não mude as chaves.
   ================================================================ */
(function(){

  /* ---- Todas as strings traduzíveis ---- */
  const T = {
    /* NAV */
    nav_aircraft:   { pt:"Aeronaves Disponíveis", en:"Aircraft Available",       es:"Aeronaves Disponibles" },
    nav_cirrus:     { pt:"Universo Cirrus",        en:"Cirrus Universe",          es:"Universo Cirrus" },
    nav_services:   { pt:"Serviços Plane",         en:"Plane Services",           es:"Servicios Plane" },
    nav_about:      { pt:"Sobre",                  en:"About",                    es:"Nosotros" },
    nav_contact:    { pt:"Contato",                en:"Contact",                  es:"Contacto" },
    nav_cta:        { pt:"Falar com um Especialista", en:"Talk to a Specialist",  es:"Hablar con un Especialista" },

    /* FOOTER */
    f_partner:       { pt:"Cirrus Authorized Partner", en:"Cirrus Authorized Partner", es:"Socio Autorizado Cirrus" },
    f_desc:          { pt:"Representante exclusiva Cirrus Aircraft no Brasil desde 2003.", en:"Exclusive Cirrus Aircraft representative in Brazil since 2003.", es:"Representante exclusiva de Cirrus Aircraft en Brasil desde 2003." },
    f_nav:           { pt:"Navegação",  en:"Navigation", es:"Navegación" },
    f_contact:       { pt:"Contato",    en:"Contact",    es:"Contacto" },
    f_newsletter:    { pt:"Newsletter", en:"Newsletter",  es:"Newsletter" },
    f_newsletter_p:  { pt:"Assine e receba novidades sobre a Cirrus e o mercado de aviação.", en:"Subscribe and receive Cirrus and aviation market news.", es:"Suscríbete y recibe noticias sobre Cirrus y el mercado de aviación." },
    f_newsletter_btn:{ pt:"Assinar",    en:"Subscribe",  es:"Suscribirse" },
    f_newsletter_ph: { pt:"Seu e-mail", en:"Your email", es:"Tu correo" },
    f_copyright:     { pt:"© 2026 Plane Aviation. Todos os direitos reservados.", en:"© 2026 Plane Aviation. All rights reserved.", es:"© 2026 Plane Aviation. Todos los derechos reservados." },
    f_sell:          { pt:"Vender seu Cirrus",    en:"Sell your Cirrus",    es:"Vender tu Cirrus" },
    f_consultant:    { pt:"Fale com um Consultor", en:"Talk to a Consultant", es:"Habla con un Consultor" },

    /* HOME */
    home_badge:       { pt:"Representante exclusiva Cirrus no Brasil", en:"Exclusive Cirrus representative in Brazil", es:"Representante exclusiva Cirrus en Brasil" },
    home_hero:        { pt:"O acesso definitivo à aviação executiva de alta performance.", en:"The definitive access to high-performance executive aviation.", es:"El acceso definitivo a la aviación ejecutiva de alto rendimiento." },
    home_cta1:        { pt:"Ver Aeronaves Disponíveis", en:"View Available Aircraft",  es:"Ver Aeronaves Disponibles" },
    home_cta2:        { pt:"Falar com um Especialista", en:"Talk to a Specialist",     es:"Hablar con un Especialista" },
    home_inv_eyebrow: { pt:"Estoque disponível",        en:"Available inventory",       es:"Inventario disponible" },
    home_inv_title:   { pt:"Oportunidades em Destaque", en:"Featured Opportunities",    es:"Oportunidades Destacadas" },
    home_inv_all:     { pt:"Ver todo estoque",          en:"View all inventory",        es:"Ver todo el inventario" },
    home_vid_eyebrow: { pt:"Plane Aviation",            en:"Plane Aviation",            es:"Plane Aviation" },
    home_vid_title:   { pt:"Conheça a nossa história",  en:"Meet our story",           es:"Conoce nuestra historia" },
    home_cirrus_eyebrow:{ pt:"Fabricante",              en:"Manufacturer",              es:"Fabricante" },
    home_cirrus_title:  { pt:"Conheça a Linha Cirrus",  en:"Discover the Cirrus Line",  es:"Conoce la Línea Cirrus" },
    home_cfg_title:   { pt:"Projete a sua aeronave de fábrica.", en:"Design your aircraft from the factory.", es:"Diseña tu aeronave de fábrica." },
    home_cfg_desc:    { pt:"Escolha modelo, exterior e interior. Envie para cotação em minutos.", en:"Choose model, exterior and interior. Submit for quote in minutes.", es:"Elige modelo, exterior e interior. Envía para cotización en minutos." },
    home_cfg_btn:     { pt:"Ir para o Configurador",  en:"Go to Configurator",        es:"Ir al Configurador" },
    home_svc_eyebrow: { pt:"Operação completa",        en:"Complete operation",         es:"Operación completa" },
    home_svc_title:   { pt:"Muito além da venda.",     en:"Far beyond the sale.",       es:"Mucho más allá de la venta." },
    home_svc_all:     { pt:"Ver todos os serviços",    en:"View all services",          es:"Ver todos los servicios" },
    home_svc_sub:     { pt:"Uma operação completa.",   en:"A complete operation.",      es:"Una operación completa." },
    home_vid_sub:     { pt:"Representante exclusiva Cirrus Aircraft no Brasil desde 2003 — excelência em aviação executiva.", en:"Exclusive Cirrus Aircraft representative in Brazil since 2003 — excellence in executive aviation.", es:"Representante exclusiva de Cirrus Aircraft en Brasil desde 2003 — excelencia en aviación ejecutiva." },
    home_cirrus_sub:  { pt:"Tecnologia de ponta, design premiado e o único paraquedas balístico integrado da aviação geral.", en:"Cutting-edge technology, award-winning design and the only integrated ballistic parachute in general aviation.", es:"Tecnología de punta, diseño galardonado y el único paracaídas balístico integrado en la aviación general." },
    home_sell_desc:   { pt:"Conectamos sua aeronave a uma rede exclusiva de compradores qualificados. Avaliação profissional, marketing especializado e processo seguro do início ao fim.", en:"We connect your aircraft to an exclusive network of qualified buyers. Professional appraisal, specialized marketing and a secure process from start to finish.", es:"Conectamos tu aeronave a una red exclusiva de compradores calificados. Valoración profesional, marketing especializado y proceso seguro de principio a fin." },
    home_news_desc:   { pt:"Acompanhe nossa visão de mercado, análises de especialistas e episódios exclusivos do nosso podcast sobre o universo da aviação executiva.", en:"Follow our market insights, expert analysis and exclusive podcast episodes about executive aviation.", es:"Sigue nuestra visión de mercado, análisis de expertos y episodios exclusivos de nuestro podcast sobre aviación ejecutiva." },
    svc1_short:       { pt:"Processo completo com segurança e agilidade: homologação ANAC, documentação e licenças internacionais.", en:"Complete process with safety and agility: ANAC homologation, documentation and international licenses.", es:"Proceso completo con seguridad y agilidad: homologación ANAC, documentación y licencias internacionales." },
    svc2_short_title: { pt:"Desembaraço Legal e Fiscal", en:"Legal & Tax Clearance",  es:"Despacho Legal y Fiscal" },
    svc2_short:       { pt:"Resolução burocrática ponta a ponta: suporte jurídico e fiscal especializado em aviação executiva.", en:"End-to-end bureaucracy resolution: specialized legal and tax support in executive aviation.", es:"Resolución burocrática de punta a punta: soporte jurídico y fiscal especializado en aviación ejecutiva." },
    svc3_short_title: { pt:"Hangaragem Premium", en:"Premium Hangaring",         es:"Hangaraje Premium" },
    svc3_short:       { pt:"Espaço exclusivo com infraestrutura de ponta para manter sua aeronave protegida e sempre pronta.", en:"Exclusive space with top infrastructure to keep your aircraft protected and always ready.", es:"Espacio exclusivo con infraestructura de punta para mantener tu aeronave protegida y siempre lista." },
    home_sell_eyebrow:{ pt:"Para proprietários",       en:"For owners",                 es:"Para propietarios" },
    home_sell_title:  { pt:"Venda seu Cirrus com quem entende do mercado.", en:"Sell your Cirrus with market experts.", es:"Vende tu Cirrus con expertos del mercado." },
    home_sell_btn:    { pt:"Quero anunciar meu avião", en:"I want to list my aircraft", es:"Quiero anunciar mi avión" },
    home_news_eyebrow:{ pt:"Conteúdo",                 en:"Content",                    es:"Contenido" },
    home_news_title:  { pt:"Plane Insights",           en:"Plane Insights",             es:"Plane Insights" },
    home_news_btn:    { pt:"Acessar News & Podcast",   en:"Access News & Podcast",      es:"Acceder a News & Podcast" },

    /* AERONAVES */
    ac_eyebrow:  { pt:"Estoque",       en:"Inventory",      es:"Inventario" },
    ac_title:    { pt:"Aeronaves Disponíveis", en:"Available Aircraft", es:"Aeronaves Disponibles" },
    ac_sub:      { pt:"Unidades certificadas, inspecionadas e prontas para entrega.", en:"Certified, inspected units ready for delivery.", es:"Unidades certificadas, inspeccionadas y listas para entrega." },
    ac_count_noun:{ pt:"aeronaves disponíveis", en:"aircraft available", es:"aeronaves disponibles" },
    ac_filters:  { pt:"Filtros",       en:"Filters",         es:"Filtros" },
    ac_model:    { pt:"Modelo:",       en:"Model:",          es:"Modelo:" },
    ac_condition:{ pt:"Condição:",     en:"Condition:",      es:"Condición:" },
    ac_year:     { pt:"Ano:",          en:"Year:",           es:"Año:" },
    ac_all:      { pt:"Todos",         en:"All",             es:"Todos" },
    ac_empty:    { pt:"Nenhuma aeronave cadastrada no momento. Em breve novas unidades estarão disponíveis.", en:"No aircraft listed at the moment. New units will be available soon.", es:"Ninguna aeronave registrada por el momento. Próximamente habrá nuevas unidades." },
    ac_noresult: { pt:"Nenhuma aeronave encontrada com os filtros selecionados.", en:"No aircraft found with the selected filters.", es:"No se encontraron aeronaves con los filtros seleccionados." },
    ac_details:  { pt:"Ver detalhes",  en:"View details",    es:"Ver detalles" },
    ac_consult:  { pt:"Sob Consulta",  en:"On Request",      es:"A Consultar" },
    ac_sell_title:{ pt:"Pensando em vender?", en:"Thinking about selling?", es:"¿Pensando en vender?" },
    ac_sell_desc: { pt:"Deixe a Plane cuidar de todo o processo comercial da sua aeronave.", en:"Let Plane handle the entire commercial process of your aircraft.", es:"Deja que Plane gestione todo el proceso comercial de tu aeronave." },
    ac_sell_btn:  { pt:"Avaliar minha aeronave", en:"Appraise my aircraft", es:"Avaluar mi aeronave" },

    /* DETALHE */
    det_crumb:    { pt:"Aeronaves Disponíveis", en:"Available Aircraft", es:"Aeronaves Disponibles" },
    det_about:    { pt:"Sobre esta aeronave",   en:"About this aircraft", es:"Sobre esta aeronave" },
    det_specs:    { pt:"Ficha Técnica",         en:"Technical Specs",     es:"Ficha Técnica" },
    det_tech:     { pt:"Tecnologias a bordo",   en:"Onboard Technologies", es:"Tecnologías a bordo" },
    det_cta1:     { pt:"Solicitar Proposta",    en:"Request a Quote",      es:"Solicitar Propuesta" },
    det_cta2:     { pt:"Agendar Visita / Call", en:"Schedule a Visit / Call", es:"Agendar Visita / Llamada" },
    det_notfound: { pt:"Aeronave não encontrada", en:"Aircraft not found", es:"Aeronave no encontrada" },
    det_notfound_p:{ pt:"Este anúncio não existe mais ou foi removido.", en:"This listing no longer exists or has been removed.", es:"Este anuncio ya no existe o fue eliminado." },
    det_back:     { pt:"Ver Aeronaves Disponíveis", en:"View Available Aircraft", es:"Ver Aeronaves Disponibles" },
    det_hours:    { pt:"horas",                 en:"hours",               es:"horas" },
    det_other:    { pt:"Outras opções disponíveis", en:"Other available options", es:"Otras opciones disponibles" },
    det_other_all:{ pt:"Ver todas",             en:"View all",            es:"Ver todas" },
    det_meta_year:   { pt:"Ano",    en:"Year",     es:"Año" },
    det_meta_cell:   { pt:"Célula", en:"Airframe",  es:"Célula" },
    det_meta_engine: { pt:"Motor",  en:"Engine",   es:"Motor" },
    det_meta_prop:   { pt:"Hélice", en:"Propeller", es:"Hélice" },

    /* UNIVERSO CIRRUS */
    uc_eyebrow:      { pt:"Tecnologia & Inovação", en:"Technology & Innovation", es:"Tecnología e Innovación" },
    uc_title:        { pt:"Universo Cirrus",         en:"Cirrus Universe",         es:"Universo Cirrus" },
    uc_hero_p:       { pt:"Conheça a filosofia de design, segurança e tecnologia da fabricante que reinventou a aviação geral.", en:"Discover the design, safety and technology philosophy of the manufacturer that reinvented general aviation.", es:"Conoce la filosofía de diseño, seguridad y tecnología del fabricante que reinventó la aviación general." },
    uc_cfg_eyebrow:  { pt:"Configure sua aeronave", en:"Configure your aircraft",  es:"Configura tu aeronave" },
    uc_cfg_title:    { pt:"Personalize cada detalhe da sua próxima aeronave.", en:"Personalize every detail of your next aircraft.", es:"Personaliza cada detalle de tu próxima aeronave." },
    uc_cfg_sub:      { pt:"Escolha modelo, exterior, interior e envie para cotação em minutos.", en:"Choose model, exterior, interior and submit for quote in minutes.", es:"Elige modelo, exterior, interior y envía para cotización en minutos." },
    uc_cfg_btn:      { pt:"Iniciar Configuração Dedicada →", en:"Start Dedicated Configuration →", es:"Iniciar Configuración Dedicada →" },
    uc_tech_eyebrow: { pt:"Tecnologias exclusivas",  en:"Exclusive technologies",  es:"Tecnologías exclusivas" },
    uc_tech_title:   { pt:"O que torna a Cirrus única", en:"What makes Cirrus unique", es:"Lo que hace única a Cirrus" },
    uc_models_eyebrow:{ pt:"Linha de modelos",       en:"Model lineup",             es:"Línea de modelos" },
    uc_models_title: { pt:"Cada aeronave, uma história", en:"Every aircraft, a story", es:"Cada aeronave, una historia" },
    uc_cta_title:    { pt:"Pronto para conhecer sua aeronave?", en:"Ready to discover your aircraft?", es:"¿Listo para conocer tu aeronave?" },
    uc_cta_p:        { pt:"Fale com um consultor Plane Aviation e descubra qual modelo é o ideal para o seu perfil de voo.", en:"Talk to a Plane Aviation consultant and discover which model is ideal for your flight profile.", es:"Habla con un consultor de Plane Aviation y descubre qué modelo es ideal para tu perfil de vuelo." },
    uc_cta1:         { pt:"Ver Aeronaves Disponíveis", en:"View Available Aircraft", es:"Ver Aeronaves Disponibles" },
    uc_cta2:         { pt:"Falar com um Consultor",   en:"Talk to a Consultant",   es:"Hablar con un Consultor" },

    /* SOBRE */
    sobre_eyebrow: { pt:"Institucional",       en:"About us",     es:"Institucional" },
    sobre_title:   { pt:"Sobre a Plane Aviation", en:"About Plane Aviation", es:"Sobre Plane Aviation" },
    sobre_hist:    { pt:"Nossa História",       en:"Our History",  es:"Nuestra Historia" },
    sobre_hist_p1: { pt:"Há mais de 20 anos, a Plane Aviation é a representante exclusiva da Cirrus Aircraft no Brasil. Desde o início, nossa missão é oferecer o que há de mais avançado em aviação geral, combinando tecnologia, segurança e excelência operacional.", en:"For over 20 years, Plane Aviation has been the exclusive representative of Cirrus Aircraft in Brazil. From the beginning, our mission has been to offer the most advanced in general aviation, combining technology, safety and operational excellence.", es:"Por más de 20 años, Plane Aviation ha sido la representante exclusiva de Cirrus Aircraft en Brasil. Desde el principio, nuestra misión ha sido ofrecer lo más avanzado en aviación general, combinando tecnología, seguridad y excelencia operacional." },
    sobre_hist_p2: { pt:"Com uma equipe especializada e infraestrutura completa, atendemos proprietários, operadores e pilotos que buscam o máximo em performance e confiabilidade.", en:"With a specialized team and complete infrastructure, we serve owners, operators and pilots who seek the best in performance and reliability.", es:"Con un equipo especializado e infraestructura completa, atendemos a propietarios, operadores y pilotos que buscan lo mejor en rendimiento y confiabilidad." },
    sobre_tl:      { pt:"Linha do Tempo",       en:"Timeline",     es:"Línea del Tiempo" },
    sobre_infra:   { pt:"Infraestrutura",       en:"Infrastructure", es:"Infraestructura" },
    sobre_hangar:  { pt:"Hangar Principal",     en:"Main Hangar",  es:"Hangar Principal" },
    sobre_manut:   { pt:"Centro de Manutenção", en:"Maintenance Center", es:"Centro de Mantenimiento" },
    sobre_team:    { pt:"Nossa Equipe",         en:"Our Team",     es:"Nuestro Equipo" },

    /* SERVIÇOS */
    svc_eyebrow:  { pt:"Soluções",             en:"Solutions",    es:"Soluciones" },
    svc_title:    { pt:"Serviços & Suporte",   en:"Services & Support", es:"Servicios y Soporte" },
    svc_sub:      { pt:"Soluções especializadas para importação, regularização e guarda da sua aeronave.", en:"Specialized solutions for import, regulation and storage of your aircraft.", es:"Soluciones especializadas para importación, regularización y resguardo de tu aeronave." },
    svc1_title:   { pt:"Assessoria de Importação", en:"Import Advisory", es:"Asesoría de Importación" },
    svc1_p:       { pt:"Conduzimos todo o processo de importação com segurança e agilidade: homologação ANAC, documentação técnica, licenças internacionais e acompanhamento de ponta a ponta.", en:"We handle the entire import process safely and efficiently: ANAC homologation, technical documentation, international licenses and end-to-end support.", es:"Gestionamos todo el proceso de importación con seguridad y agilidad: homologación ANAC, documentación técnica, licencias internacionales y acompañamiento de punta a punta." },
    svc2_title:   { pt:"Desembaraço Legal e Nacionalização", en:"Legal Clearance & Nationalization", es:"Despacho Legal y Nacionalización" },
    svc2_p:       { pt:"Resolvemos toda a burocracia para você: desembaraço aduaneiro, nacionalização, registros junto à ANAC e suporte jurídico-fiscal especializado em aviação executiva.", en:"We handle all bureaucracy for you: customs clearance, nationalization, ANAC registrations and specialized legal and tax support in executive aviation.", es:"Resolvemos toda la burocracia por ti: despacho aduanero, nacionalización, registros ante la ANAC y soporte jurídico-fiscal especializado en aviación ejecutiva." },
    svc3_title:   { pt:"Hangaragem",           en:"Hangaring",    es:"Hangaraje" },
    svc3_p:       { pt:"Espaço exclusivo com infraestrutura de ponta para manter sua aeronave segura, protegida e sempre pronta para operar. Acesso controlado e monitoramento contínuo.", en:"Exclusive space with top-notch infrastructure to keep your aircraft safe, protected and always ready to operate. Controlled access and continuous monitoring.", es:"Espacio exclusivo con infraestructura de primer nivel para mantener tu aeronave segura, protegida y siempre lista para operar. Acceso controlado y monitoreo continuo." },
    svc_talk:     { pt:"Falar com a Equipe",   en:"Talk to the Team", es:"Hablar con el Equipo" },

    /* CONTATO */
    ct_eyebrow:   { pt:"Fale conosco",  en:"Get in touch",  es:"Contáctanos" },
    ct_title:     { pt:"Contato",       en:"Contact",       es:"Contacto" },
    ct_sub:       { pt:"Nossa equipe de especialistas está pronta para atender você.", en:"Our team of specialists is ready to assist you.", es:"Nuestro equipo de especialistas está listo para atenderte." },
    ct_wa:        { pt:"Canal Prioritário", en:"Priority Channel", es:"Canal Prioritario" },
    ct_wa_title:  { pt:"Atendimento rápido via WhatsApp", en:"Quick service via WhatsApp", es:"Atención rápida por WhatsApp" },
    ct_wa_sub:    { pt:"Resposta em até 1 hora útil. Fale diretamente com um especialista.", en:"Response within 1 business hour. Speak directly with a specialist.", es:"Respuesta en 1 hora hábil. Habla directamente con un especialista." },
    ct_wa_btn:    { pt:"Abrir WhatsApp", en:"Open WhatsApp", es:"Abrir WhatsApp" },
    ct_form_title:{ pt:"Envie uma mensagem", en:"Send a message", es:"Envía un mensaje" },
    ct_name:      { pt:"Nome *",        en:"Name *",         es:"Nombre *" },
    ct_phone:     { pt:"Telefone *",    en:"Phone *",        es:"Teléfono *" },
    ct_email:     { pt:"E-mail *",      en:"Email *",        es:"Correo *" },
    ct_subject:   { pt:"Assunto *",     en:"Subject *",      es:"Asunto *" },
    ct_msg:       { pt:"Mensagem",      en:"Message",        es:"Mensaje" },
    ct_send:      { pt:"Enviar Mensagem", en:"Send Message",  es:"Enviar Mensaje" },
    ct_info:      { pt:"Informações de Contato", en:"Contact Information", es:"Información de Contacto" },

    /* CONFIGURADOR */
    cfg_eyebrow:  { pt:"Configuração",   en:"Configuration", es:"Configuración" },
    cfg_title:    { pt:"Monte sua aeronave", en:"Build your aircraft", es:"Arma tu aeronave" },
    cfg_sub:      { pt:"Personalize modelo, exterior e interior. Envie para cotação em minutos.", en:"Customize model, exterior and interior. Submit for quote in minutes.", es:"Personaliza modelo, exterior e interior. Envía para cotización en minutos." },
    cfg_s1:       { pt:"Passo 1 — Escolha o Modelo", en:"Step 1 — Choose the Model", es:"Paso 1 — Elige el Modelo" },
    cfg_s2:       { pt:"Passo 2 — Cor Exterior",     en:"Step 2 — Exterior Color",   es:"Paso 2 — Color Exterior" },
    cfg_s3:       { pt:"Passo 3 — Interior",          en:"Step 3 — Interior",         es:"Paso 3 — Interior" },
    cfg_back:     { pt:"← Voltar", en:"← Back", es:"← Volver" },
    cfg_quote:    { pt:"Solicitar Cotação", en:"Request a Quote", es:"Solicitar Cotización" },

    /* NEWS */
    news_eyebrow:    { pt:"Conteúdo & Mídia", en:"Content & Media", es:"Contenido y Medios" },
    news_title:      { pt:"News & Insights",  en:"News & Insights",  es:"News & Insights" },
    news_art_eyebrow:{ pt:"Editorial",        en:"Editorial",         es:"Editorial" },
    news_art_title:  { pt:"Artigos e Análises Técnicas", en:"Articles and Technical Analyses", es:"Artículos y Análisis Técnicos" },
    news_pod_eyebrow:{ pt:"Áudio",            en:"Audio",             es:"Audio" },
    news_pod_title:  { pt:"Plane Aviation Podcast", en:"Plane Aviation Podcast", es:"Plane Aviation Podcast" },
    news_read:       { pt:"Ler Artigo Completo →", en:"Read Full Article →", es:"Leer Artículo Completo →" },
    news_nl_title:   { pt:"Fique por dentro do mercado de aviação executiva.", en:"Stay up to date with the executive aviation market.", es:"Mantente al día con el mercado de aviación ejecutiva." },
    news_nl_btn:     { pt:"Assinar", en:"Subscribe", es:"Suscribirse" },
  };

  const LANGS = ["pt","en","es"];

  function getLang(){ return localStorage.getItem("pa_lang") || "pt"; }
  function setLang(l){
    if (!LANGS.includes(l)) return;
    localStorage.setItem("pa_lang", l);
    applyLang();
  }
  function t(key){
    const lang = getLang();
    const entry = T[key];
    if (!entry) return key;           // Se chave não encontrada, retorna a própria chave
    return entry[lang] || entry.pt || key;
  }

  // Aplica traduções a todos os elementos [data-i18n] na página
  function applyLang(){
    const lang = getLang();
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const val = t(el.getAttribute("data-i18n"));
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = val;
      else el.textContent = val;
    });
    // Atualiza botões de idioma
    document.querySelectorAll(".lang-btn,.lang-opt").forEach(b => {
      b.classList.toggle("active", b.dataset.lang === lang);
      b.classList.toggle("sel",    b.dataset.lang === lang);
    });
    // Atualiza label do seletor de idioma (dropdown)
    document.querySelectorAll(".lang-current").forEach(btn => {
      const svg = btn.querySelector("svg");
      btn.childNodes[0].textContent = lang.toUpperCase() + " ";
      if(svg) btn.appendChild(svg);
    });
    // Avisa outras partes da página (re-render de cards, filtros, etc.)
    document.dispatchEvent(new CustomEvent("pa:langchange", { detail: lang }));
  }

  // Expõe API global
  window.PA_I18N = { t, getLang, setLang, applyLang };

  // Aplica assim que o DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyLang);
  } else {
    applyLang();
  }
})();
