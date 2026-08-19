// Pegando os elementos pelo ID com JS puro e leve
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mainHeader = document.getElementById('mainHeader');

// Escutador de evento de clique brabo
menuBtn.addEventListener('click', () => {
    // Alterna a classe 'active' no botão (faz ele virar o X no CSS)
    menuBtn.classList.toggle('active');
    
    // Mostra/Esconde a lista do menu
    mobileMenu.classList.toggle('active');
    
    // Troca a cor e borda do container inteiro pra ficar igual seu print
    mainHeader.classList.toggle('menu-open');
});


// ==========================================
// INTEGRAÇÃO FORMULÁRIO -> MAKE WEBHOOK
// ==========================================

// Cole aqui a URL que o Make vai gerar no módulo "Custom Webhook"
const webhookMakeURL = 'https://hook.us1.make.com/qlti5c3bwq4k5cu72xq0kbhjo2pde1hs'; 

const form = document.getElementById('leadForm');
const btnSubmit = document.getElementById('btnSubmit');

if (form) {
    form.addEventListener('submit', async (e) => {
        // Evita que a página recarregue (comportamento padrão do HTML)
        e.preventDefault();
        
        // UX: Muda o botão e desabilita pra evitar que o usuário clique duas vezes
        btnSubmit.disabled = true;
        btnSubmit.innerText = 'Enviando...';
        btnSubmit.style.opacity = '0.7';
        btnSubmit.style.cursor = 'not-allowed';
        
        // Pega todos os dados preenchidos no form
        const formData = new FormData(form);
        
        // Converte os dados para um objeto JSON limpo (ideal pro Make)
        const dataForm = Object.fromEntries(formData.entries());
        
        try {
            // Dispara a requisição POST pro Make
            const response = await fetch(webhookMakeURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm)
            });

            // Se o Make responder com sucesso (Status 200)
            if (response.ok) {
                console.log('Lead enviado com sucesso pro Make!');
                // Redireciona para a página de obrigado
                window.location.href = 'obrigado.html';
            } else {
                throw new Error('Erro na comunicação com o servidor');
            }

        } catch (error) {
            console.error('Erro:', error.message);
            alert('Ops! Houve um problema ao enviar seus dados. Tente novamente em instantes.');
            
            // Volta o botão ao estado original em caso de erro
            btnSubmit.disabled = false;
            btnSubmit.innerText = 'Confirmar Presença';
            btnSubmit.style.opacity = '1';
            btnSubmit.style.cursor = 'pointer';
        }
    });
}