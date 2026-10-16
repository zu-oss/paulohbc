const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Função que cria a pausa entre a digitação das letras
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function startTypewriterEffect() {
    const typewriterLines = document.querySelectorAll('.typewriter');
    const hiddenBlocks = document.querySelectorAll('.hidden-block');
    const finalCursor = document.querySelector('.final-cursor');

    // 1. Reseta o terminal limpando textos antigos e escondendo blocos
    typewriterLines.forEach(line => line.textContent = "");
    hiddenBlocks.forEach(block => block.classList.remove('show-block'));
    if (finalCursor) finalCursor.style.display = "none";

    // 2. Percorre cada comando simulado para digitar sequencialmente
    for (let i = 0; i < typewriterLines.length; i++) {
        const element = typewriterLines[i];
        const textToType = element.getAttribute('data-text') || "";
        
        // Digita letra por letra
        for (let j = 0; j < textToType.length; j++) {
            element.textContent += textToType[j];
            await delay(40); // Velocidade da digitação (40ms por letra)
        }

        await delay(250); // Pausa realista após terminar o comando
        
        // Revela o bloco de resposta correspondente
        if (hiddenBlocks[i]) {
            hiddenBlocks[i].classList.add('show-block');
        }
        
        await delay(150); // Pausa antes de ir para o próximo comando
    }

    // 3. Mostra o prompt final piscando
    if (finalCursor) finalCursor.style.display = "block";
}

// Monitora o clique no botão para alternar os estilos
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('view-modern')) {
        body.classList.remove('view-modern');
        body.classList.add('view-cmd');
        themeToggle.textContent = 'Voltar para a Interface Normal';
        
        // Executa a animação de digitação
        startTypewriterEffect();
    } else {
        body.classList.remove('view-cmd');
        body.classList.add('view-modern');
        themeToggle.textContent = 'Acessar Modo Terminal (CMD)';
    }
});
