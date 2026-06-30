/* ================================================================
   PARALAXE CIRRUS GSAP (Apenas para a Homepage)
   ================================================================ */
function iniciarAnimacaoCirrus() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById('cp-aviao-canvas');
  if (!canvas) return; 
  const context = canvas.getContext('2d');

  const frameCount = 34; 
  const currentFrame = index => `img/cirrus-sequence/${(index + 1).toString().padStart(2, '0')}.webp`;

  const images = [];
  const aviao = { frame: 0 };

  // Conta quantas imagens já terminaram de carregar, para saber quando
  // o canvas está com o tamanho real e o layout pode ser recalculado.
  let loadedCount = 0;

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      if (i === 0) renderCanvas();
      // Quando TODAS as imagens carregarem, força o ScrollTrigger a
      // recalcular as alturas dos pins — evita o cálculo errado de
      // pin-spacer que acontecia enquanto o canvas ainda tinha tamanho 0.
      if (loadedCount === frameCount) {
        ScrollTrigger.refresh();
      }
    };
    img.src = currentFrame(i);
    images.push(img);
  }

  function renderCanvas() {
    if(images[aviao.frame]) {
      const img = images[aviao.frame];
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    }
  }

  gsap.set("#cp-texto-aviao", { y: "50%", opacity: 0 });
  gsap.set("#cp-texto-modelo", { y: "50%", opacity: 0, scale: 1.1 });
  gsap.set("#cp-card-glass", { y: 100, opacity: 0 });

  const tl = gsap.timeline();

  tl.to(aviao, { frame: frameCount - 1, snap: "frame", ease: "none", onUpdate: renderCanvas, duration: 1 }, 0)
    .to("#cp-texto-aviao", { y: "-10%", opacity: 1, duration: 0.3, ease: "power1.out" }, 0.1)
    .to("#cp-texto-aviao", { y: "-40%", opacity: 0, duration: 0.2, ease: "power1.in" }, 0.4)
    .to("#cp-texto-modelo", { y: "0%", opacity: 1, scale: 1, duration: 0.3, ease: "power1.out" }, 0.4)
    .to("#cp-texto-modelo", { y: "-30%", opacity: 0, duration: 0.2, ease: "power1.in" }, 0.7)
    .to("#cp-card-glass", { y: 0, opacity: 1, duration: 0.2, ease: "back.out(1.5)" }, 0.8);

  ScrollTrigger.create({
    trigger: ".cp-section",
    start: "top top",
    end: "+=400%", 
    pin: true,
    animation: tl,
    scrub: 1
  });

  // Rede de segurança: recalcula todos os ScrollTriggers da página
  // depois que a janela e as fontes terminarem de carregar 100%.
  // Isso corrige alturas erradas de pin-spacer causadas por imagens
  // ou fontes que ainda estavam carregando no momento do cálculo inicial.
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

document.addEventListener("DOMContentLoaded", iniciarAnimacaoCirrus);