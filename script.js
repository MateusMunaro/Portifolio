document.addEventListener("DOMContentLoaded", function () {
    var loadingElement = document.getElementById("loading");

    // Adiciona um event listener para o evento load da página
    window.addEventListener("load", function () {
        // Adiciona um atraso artificial de 3 segundos (3000 milissegundos) antes de esconder o loading
        setTimeout(function () {
            loadingElement.style.display = "none";
            document.body.style.overflow = "auto"; // Restaura a barra de rolagem
        }, 3000);
    });
});

//bubbles

const bolinhaContainer = document.querySelector('.bolinha-container');
const bolinhas = [];
const cursorRadius = 100;

// Função para criar bolinhas ao longo de uma grade
function createBolinha(x, y) {
    const bolinha = document.createElement('div');
    bolinha.classList.add('bolinha');
    bolinha.style.left = `${x}px`;
    bolinha.style.top = `${y}px`;

    // Adiciona a bolinha à .bolinha-container
    bolinhaContainer.appendChild(bolinha);
    bolinhas.push(bolinha);

    return bolinha;
}

const numBolinhasX = 40; // Número de bolinhas ao longo do eixo x
const numBolinhasY = 20; // Número de bolinhas ao longo do eixo y
const spacingX = bolinhaContainer.offsetWidth / numBolinhasX;
const spacingY = bolinhaContainer.offsetHeight / numBolinhasY;

// Adiciona bolinhas na .bolinha-container
for (let i = 0; i < numBolinhasX; i++) {
    for (let j = 0; j < numBolinhasY; j++) {
        const x = i * spacingX;
        const y = j * spacingY;
        createBolinha(x, y);
    }
}

// Adiciona um evento de mousemove à .bolinha-container
bolinhaContainer.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Altera o tamanho das bolinhas dentro do novo raio do cursor
    bolinhas.forEach(bolinha => {
        const bolinhaX = parseFloat(bolinha.style.left) + bolinha.offsetWidth / 2;
        const bolinhaY = parseFloat(bolinha.style.top) + bolinha.offsetHeight / 2;

        const distance = Math.sqrt((mouseX - bolinhaX) ** 2 + (mouseY - bolinhaY) ** 2);

        if (distance < cursorRadius) {
            const newSize = Math.max(10, 250 - distance / 10); // Ajuste os valores conforme necessário
            bolinha.style.transform = `scale(${newSize / 20})`; // Normaliza o tamanho para 20px inicial
        } else {
            bolinha.style.transform = 'scale(1)'; // Retorna ao tamanho original
        }
    });
});