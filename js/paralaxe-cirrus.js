/* ================================================================
   PARALAXE CIRRUS GSAP (Apenas para a Homepage)
   Dinâmica: Autoplay por gatilho com ajuste fino de tempo de trava
   ================================================================ */
function iniciarAnimacaoCirrus() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById('cp-aviao-canvas');
  if (!canvas) return; 
  const context = canvas.getContext('2d');

  const frameCount = 60; 
  const currentFrame = index => `img/cirrus-sequence/${(index + 1).toString().padStart(2, '0')}.webp`;

  const images = [];
  const aviao = { frame: 0 };
  let loadedCount = 0;

  // Pré-carregamento das imagens no Canvas
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      if (i === 0) renderCanvas();
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

  // Estados iniciais limpos da tipografia e do card
  gsap.set("#cp-texto-aviao", { y: "50%", opacity: 0 });
  gsap.set("#cp-texto-modelo", { y: "50%", opacity: 0, scale: 1.1 });
  gsap.set("#cp-card-glass", { y: 100, opacity: 0 });

  // Criação da Timeline automatizada
  const tl = gsap.timeline({ paused: true });

  tl.to(aviao, { 
      frame: frameCount - 1, 
      snap: "frame", 
      ease: "none", 
      onUpdate: renderCanvas, 
      duration: 3.5 
    }, 0)
    // Texto 1 entra e sai
    .to("#cp-texto-aviao", { y: "-10%", opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3)
    .to("#cp-texto-aviao", { y: "-40%", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.2)
    
    // Texto 2 (Modelo) entra e sai (termina no segundo 2.8)
    .to("#cp-texto-modelo", { y: "0%", opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 1.4)
    .to("#cp-texto-modelo", { y: "-30%", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.3)
    
    /* CORREÇÃO 1: O Card agora entra exatamente no segundo 2.8 (sem buraco de espera).
       Aumentei a duração para 0.8s para ele subir com elegância mecânica.
    */
    .to("#cp-card-glass", { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }, 2.8);

  /* CORREÇÃO 2: Ajuste fino do ScrollTrigger.
     Reduzido o 'end' de +=250% para +=120%. Isso remove o "scroll fantasma"
     e faz a página desprender o pin quase imediatamente após a subida do card.
  */
  ScrollTrigger.create({
    trigger: ".cp-section",
    start: "top top",
    end: "+=120%",   /* O segredo para eliminar o "site travado" está aqui! */
    pin: true, 
    scrub: false, 
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.reverse()
  });

  // Redes de segurança de renderização
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

document.addEventListener("DOMContentLoaded", iniciarAnimacaoCirrus);