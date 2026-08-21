/**
 * ==========================================
 * SCRIPT DA LANDING PAGE - PLANE AVIATION
 * Padrão Sênior de Organização
 * ==========================================
 */

// ==========================================
// 1. SELEÇÃO GLOBAL DE ELEMENTOS (DOM)
// ==========================================

// Header e Menu Mobile
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mainHeader = document.getElementById('mainHeader');

// Lista de Serviços (Efeito Cascata)
const ulElement = document.getElementById('checkList');

// Modal Galeria Fullscreen
const galleryModal = document.getElementById('galleryModal');
const modalTrack = document.getElementById('modalCarouselTrack');
let currentModalIndex = 0;

// Modal de Cotação VIP (Formulário)
const quoteModal = document.getElementById('quoteModal');
const closeQuoteModalBtn = document.getElementById('closeModalBtn');


// ==========================================
// 2. HEADER E MENU MOBILE
// ==========================================
if (menuBtn && mobileMenu && mainHeader) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mainHeader.classList.toggle('menu-open');
    });
}


// ==========================================
// 3. ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER)
// ==========================================

// Animação em Cascata da Lista de Serviços
if (ulElement) {
    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                
                // Aplica a classe com delay progressivo
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-check');
                    }, index * 250); 
                });
                
                // Desativa o observador após rodar uma vez
                listObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.4 });

    listObserver.observe(ulElement);
}


// ==========================================
// 4. CARROSSEL DA AERONAVE (INLINE)
// ==========================================
function moveCarousel(direction) {
    const track = document.getElementById('planeCarousel');
    if (!track) return; // Trava de segurança
    
    const slideWidth = track.clientWidth; 
    
    track.scrollBy({
        left: slideWidth * direction,
        behavior: 'smooth'
    });
}


// ==========================================
// 5. GALERIA FULLSCREEN (MODAL DE IMAGENS)
// ==========================================

function openGalleryModal(index) {
    if (!galleryModal || !modalTrack) return;
    
    currentModalIndex = index;
    galleryModal.classList.add('active');
    jumpToModalSlide(index);
    
    document.body.style.overflow = 'hidden'; // Trava scroll da página
}

function closeGalleryModal() {
    if (!galleryModal) return;
    
    galleryModal.classList.remove('active');
    document.body.style.overflow = ''; // Libera scroll da página
}

function jumpToModalSlide(index) {
    if (!modalTrack) return;
    const slideWidth = modalTrack.clientWidth;
    modalTrack.scrollLeft = slideWidth * index;
}

function moveModalCarousel(direction) {
    if (!modalTrack) return;
    
    const slideWidth = modalTrack.clientWidth;
    const slides = modalTrack.querySelectorAll('.gallery-slide');
    
    currentModalIndex += direction;
    
    // Looping infinito no carrossel do modal
    if (currentModalIndex < 0) currentModalIndex = slides.length - 1;
    if (currentModalIndex >= slides.length) currentModalIndex = 0;
    
    modalTrack.scrollTo({
        left: slideWidth * currentModalIndex,
        behavior: 'smooth'
    });
}


// ==========================================
// 6. MODAL DE COTAÇÃO VIP (CONSULTORIA)
// ==========================================

// Abre o formulário
function openModal() {
    if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fecha o formulário
function closeModal() {
    if (quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fecha clicando no botão X
if (closeQuoteModalBtn) {
    closeQuoteModalBtn.addEventListener('click', closeModal);
}

// Fecha clicando fora da caixa (no overlay borrado)
if (quoteModal) {
    window.addEventListener('click', (event) => {
        if (event.target === quoteModal) {
            closeModal();
        }
    });
}

// ==========================================
// CONTROLE DO CARROSSEL DE DEPOIMENTOS
// ==========================================
function moveTestimonial(direction) {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    
    // Pega a largura de um card inteiro mais o gap
    const card = track.querySelector('.testimonial-card');
    const scrollAmount = card.clientWidth + 30; // 30 é o gap do CSS
    
    track.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}
// ==========================================
// 7. ENVIO DE FORMULÁRIO (WEBHOOK MAKE) E REDIRECIONAMENTO
// ==========================================

const leadForm = document.getElementById('leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede a página de recarregar sozinha

        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');

        // Estado de "Carregando"
        btnText.innerText = 'Enviando...';
        spinner.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Captura os dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            interesse: 'Cirrus SR22 G7+ 2026',
            perfil_aviacao: document.getElementById('perfil_aviacao').value,
            tempo_aquisicao: document.getElementById('tempo_aquisicao').value,
            utilizacao_aeronave: document.getElementById('utilizacao_aeronave').value, // <-- NOVA PERGUNTA CAPTURADA AQUI
            origem: 'Landing Page Plane Aviation'
        };

        // ⚠️ COLOQUE A URL DO SEU WEBHOOK DO MAKE AQUI ⚠️
        const webhookURL = 'https://hook.us1.make.com/uai4mli9tx4orle8rhjqo7vmtp446vfx'; 

        try {
            // Dispara pro Webhook
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok || response.type === 'opaque') {
                // SUCESSO! Redireciona para a Página de Obrigado
                window.location.href = 'obrigado.html';
            } else {
                throw new Error('Erro na resposta do webhook');
            }
        } catch (error) {
            console.error('Erro ao enviar lead:', error);
            alert('Houve um pequeno erro de conexão. Por favor, tente novamente.');
            
            // Volta o botão ao normal em caso de erro
            btnText.innerText = 'Tenho interesse';
            spinner.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}