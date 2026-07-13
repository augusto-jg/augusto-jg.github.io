// ==========================================
// 1. Alternância de Tema (Dark / Light Mode)
// ==========================================

// Buscamos os elementos que precisamos na página pelo seu ID (como se fossem crachás de identificação)
const themeToggleBtn = document.getElementById('theme-toggle'); // O botão de trocar o tema
const themeIcon = document.getElementById('theme-icon'); // O ícone dentro do botão (sol/lua)
const htmlElement = document.documentElement; // A tag principal <html> da nossa página

// Aqui nós "perguntamos" ao navegador se ele lembra a cor que o usuário escolheu na última vez
const savedTheme = localStorage.getItem('theme');

// Se o navegador lembrar (savedTheme não for vazio)...
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme); // Nós aplicamos o tema salvo
    updateIcon(savedTheme); // E atualizamos o ícone
}

// Quando alguém CLICAR no botão de trocar tema, o código abaixo será executado
themeToggleBtn.addEventListener('click', () => {
    // Pegamos qual é o tema que está ativo agora
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    // Decidimos qual será o novo tema. 
    // Lógica: se for escuro (dark), vira claro (light). Se não, vira escuro (dark).
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplicamos o novo tema na página HTML
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Pedimos ao navegador para guardar essa escolha (salvar a preferência)
    localStorage.setItem('theme', newTheme);
    
    // Mudamos a figurinha do botão (lua/sol) chamando nossa função auxiliar
    updateIcon(newTheme);
});

// Função auxiliar apenas para desenhar o ícone correto
function updateIcon(theme) {
    if (theme === 'light') {
        // Se for modo claro, tiramos o ícone de sol e colocamos o de lua
        themeIcon.classList.remove('ph-sun');
        themeIcon.classList.add('ph-moon');
    } else {
        // Se for modo escuro, tiramos o ícone de lua e colocamos o de sol
        themeIcon.classList.remove('ph-moon');
        themeIcon.classList.add('ph-sun');
    }
}


// ==========================================
// 2. Animação de Scroll (Fade In)
// ==========================================

// Selecionamos TODAS as partes do site que queremos que surjam suavemente.
// O 'querySelectorAll' devolve uma lista (como uma caixa cheia de elementos).
const sectionsToReveal = document.querySelectorAll('.reveal-section');

// Regras para o nosso "vigilante" (o observador)
const observerOptions = {
    root: null, // Ele vai olhar para a tela inteira
    rootMargin: '0px', // Sem margem invisível
    threshold: 0.15 // 15%: A animação só dispara quando pelo menos um pedacinho (15%) da seção aparecer na tela
};

// Aqui nós criamos o nosso vigilante, chamado de "Intersection Observer" (Observador de Interseção)
const sectionObserver = new IntersectionObserver((entries, observer) => {
    // Para cada elemento da nossa lista que está sendo vigiado...
    entries.forEach(entry => {
        // Se o elemento acabou de entrar na tela do usuário...
        if (entry.isIntersecting) {
            // Nós adicionamos a classe 'active' nele. O CSS vai ver essa classe e fazer o elemento surgir suavemente!
            entry.target.classList.add('active');
            
            // Depois que o elemento já apareceu, dizemos pro vigilante parar de olhar pra ele (para não ficar animando toda hora)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Por fim, dizemos para o vigilante começar a observar cada uma das seções da nossa lista
sectionsToReveal.forEach(section => {
    sectionObserver.observe(section);
});
