/* ================================================================
   SCROLL INSTITUCIONAL (TEXTOS E LINHA VERMELHA)
   ================================================================ */
function iniciarAnimacaoInstitucional() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.getElementById("instScrollSec");
  if (!section) return;

  // Garante que o slide 1 comece visível e os outros invisíveis e deslocados para baixo
  gsap.set("#slide-1", { autoAlpha: 1, y: 0 });
  gsap.set(["#slide-2", "#slide-3", "#slide-4"], { autoAlpha: 0, y: 40 });

  const tlInst = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=350%", // Trava por 3.5x a altura da tela
      pin: true,
      scrub: 1
    }
  });

  // A linha vermelha viaja da esquerda para a direita de forma contínua durante todo o scroll
  tlInst.to(".red-line-anim", { x: "120vw", ease: "none", duration: 3 }, 0);

  // Transições dos textos (Subindo e sumindo, o próximo subindo e aparecendo)
  
  // Slide 1 para 2
  tlInst.to("#slide-1", { autoAlpha: 0, y: -40, duration: 0.4 }, 0.2)
        .to("#slide-2", { autoAlpha: 1, y: 0, duration: 0.4 }, 0.6);

  // Slide 2 para 3
  tlInst.to("#slide-2", { autoAlpha: 0, y: -40, duration: 0.4 }, 1.2)
        .to("#slide-3", { autoAlpha: 1, y: 0, duration: 0.4 }, 1.6);

  // Slide 3 para 4
  tlInst.to("#slide-3", { autoAlpha: 0, y: -40, duration: 0.4 }, 2.2)
        .to("#slide-4", { autoAlpha: 1, y: 0, duration: 0.4 }, 2.6);

  // Rede de segurança: recalcula o pin depois que a página e as fontes
  // terminarem de carregar, evitando altura errada de pin-spacer.
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", iniciarAnimacaoInstitucional);