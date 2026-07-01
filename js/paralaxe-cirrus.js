/* ================================================================
   PARALAXE CIRRUS GSAP (Apenas para a Homepage)
   Dinâmica: Autoplay por gatilho com 60 Frames Unificados
   ================================================================ */
function iniciarAnimacaoCirrus() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById('cp-aviao-canvas');
  if (!canvas) return; 
  const context = canvas.getContext('2d');

  // 1. ATUALIZADO: Agora mapeando a nova sequência de 60 imagens
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

  /* 2. TIMELINE PAUSADA: Criada em modo estático para controle autônomo.
     Ajustei as durações (duration) e atrasos com tempos reais em segundos, 
     já que agora ela corre sozinha em velocidade constante!
  */
  const tl = gsap.timeline({ paused: true });

  tl.to(aviao, { 
      frame: frameCount - 1, 
      snap: "frame", 
      ease: "none", 
      onUpdate: renderCanvas, 
      duration: 3.5 // O avião vai rodar os 60 frames perfeitamente em 3.5 segundos
    }, 0)
    // Texto de cima entra e sai no primeiro terço da animação
    .to("#cp-texto-aviao", { y: "-10%", opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3)
    .to("#cp-texto-aviao", { y: "-40%", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.2)
    
    // Texto de baixo (Modelo) entra logo em seguida
    .to("#cp-texto-modelo", { y: "0%", opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 1.4)
    .to("#cp-texto-modelo", { y: "-30%", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.3)
    
    // O grande card de Glassmorphism final surge com o efeito elástico suave de fechamento
    .to("#cp-card-glass", { y: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" }, 4.5);

  /* 3. SCROLLTRIGGER COM AUTOPLAY:
     Arrancamos o 'scrub: 1' para o usuário não ditar a velocidade arrastando o mouse.
     Agora, o scroll funciona como um botão de 'Play' e 'Reverse' inteligente.
  */
  ScrollTrigger.create({
    trigger: ".cp-section",
    start: "top top",
    end: "+=250%", // Espaço que o usuário vai scrollar enquanto assiste o avião passar
    pin: true,     // Prende a tela de forma limpa
    scrub: false,  // LIBERADO: Desativa o travamento manual por pixel de scroll
    
    // Dispara a animação 100% automática e fluída ao entrar na seção
    onEnter: () => tl.play(),
    
    // Se o usuário voltar a rolagem pro topo do site, reverte a animação inteira com classe
    onLeaveBack: () => tl.reverse()
  });

  // Redes de segurança para recálculo de layouts
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

document.addEventListener("DOMContentLoaded", iniciarAnimacaoCirrus);