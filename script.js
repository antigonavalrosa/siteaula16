// Ano atualizado automaticamente
document.getElementById("ano").textContent = new Date().getFullYear();

// Menu para celulares
const menuBotao = document.getElementById("menuBotao");
const menu = document.getElementById("menu");

menuBotao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    menuBotao.setAttribute("aria-expanded", aberto);
    menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        menuBotao.setAttribute("aria-expanded", "false");
    });
});

// Anima os elementos quando aparecem na tela
const elementosAnimados = document.querySelectorAll(".aparece");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(function (entradas, observadorAtual) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observadorAtual.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });

    elementosAnimados.forEach(function (elemento) {
        observador.observe(elemento);
    });
} else {
    elementosAnimados.forEach(function (elemento) {
        elemento.classList.add("visivel");
    });
}

// Filtros de produtos
const botoesFiltro = document.querySelectorAll(".filtro");
const cartoesProduto = document.querySelectorAll(".produto-card");

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const filtro = botao.dataset.filtro;

        botoesFiltro.forEach(function (item) {
            item.classList.remove("ativo");
        });
        botao.classList.add("ativo");

        cartoesProduto.forEach(function (cartao) {
            const categoria = cartao.dataset.categoria;
            const mostrar = filtro === "todos" || categoria === filtro;
            cartao.classList.toggle("escondido", !mostrar);
        });
    });
});

// Janela de detalhes dos produtos
const modal = document.getElementById("modalProduto");
const modalTitulo = document.getElementById("modalTitulo");
const modalContato = document.getElementById("modalContato");
const fecharModal = document.getElementById("fecharModal");
let elementoAnterior = null;

function abrirModal(nomeProduto) {
    elementoAnterior = document.activeElement;
    modalTitulo.textContent = nomeProduto;
    modalContato.href = "mailto:contato@infopecas.com.br?subject=" +
        encodeURIComponent("Consulta sobre " + nomeProduto);
    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");
    fecharModal.focus();
}

function fecharJanela() {
    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");
    if (elementoAnterior) elementoAnterior.focus();
}

document.querySelectorAll(".produto-link").forEach(function (botao) {
    botao.addEventListener("click", function () {
        abrirModal(botao.dataset.produto);
    });
});

fecharModal.addEventListener("click", fecharJanela);
modal.querySelectorAll("[data-fechar-modal]").forEach(function (item) {
    item.addEventListener("click", fecharJanela);
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && modal.classList.contains("aberto")) {
        fecharJanela();
    }
});

// Efeito 3D sutil nos cartões, apenas em computadores com mouse
const temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (temMouse) {
    cartoesProduto.forEach(function (cartao) {
        cartao.addEventListener("mousemove", function (evento) {
            const caixa = cartao.getBoundingClientRect();
            const x = (evento.clientX - caixa.left) / caixa.width;
            const y = (evento.clientY - caixa.top) / caixa.height;
            const rotacaoY = (x - 0.5) * 7;
            const rotacaoX = (0.5 - y) * 7;
            cartao.style.transform = "perspective(850px) rotateX(" + rotacaoX +
                "deg) rotateY(" + rotacaoY + "deg) translateY(-3px)";
        });

        cartao.addEventListener("mouseleave", function () {
            cartao.style.transform = "";
        });
    });

    const chip = document.getElementById("chip3d");
    const visual = document.querySelector(".hero-visual");

    visual.addEventListener("mousemove", function (evento) {
        const caixa = visual.getBoundingClientRect();
        const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
        const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
        chip.style.animation = "none";
        chip.style.transform = "rotateX(" + (55 - y * 12) + "deg) rotateZ(" +
            (-35 + x * 12) + "deg) translateY(-4px)";
    });

    visual.addEventListener("mouseleave", function () {
        chip.style.animation = "";
        chip.style.transform = "";
    });
}

// Botão para voltar ao topo aparece ao rolar a página
const topoFlutuante = document.getElementById("topoFlutuante");

window.addEventListener("scroll", function () {
    topoFlutuante.classList.toggle("visivel", window.scrollY > 450);

    const secoes = document.querySelectorAll("main section[id]");
    let secaoAtual = "inicio";

    secoes.forEach(function (secao) {
        if (window.scrollY >= secao.offsetTop - 150) {
            secaoAtual = secao.id;
        }
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.classList.toggle("link-ativo", link.getAttribute("href") === "#" + secaoAtual);
    });
}, { passive: true });

topoFlutuante.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});