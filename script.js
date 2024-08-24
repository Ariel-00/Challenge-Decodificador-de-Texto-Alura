//* Função para exibir textos de saída 
const exibirTextoSaida = (tag, texto) => {
    const elemento = document.querySelector(tag);
    if (elemento) {
        elemento.innerHTML = texto;       
    } else {
        console.error(`Elemento com a tag ${tag} não encontrado.`);
    }
};

//* Ocultar imagem, limpar o h3 e mostrar o botão copiar
const mostrarOutput = () => {
    document.getElementById("img-luffy").style.display = "none";
    exibirTextoSaida("h3", "");

    const botaoCopiar = document.getElementById("botaoCopiar");
    if (botaoCopiar) {
        botaoCopiar.style.display = "block"; // Mostrar o botão de copiar
        botaoCopiar.style.pointerEvents = "auto"; // Habilitar eventos do botão
    } else {
        console.error("Botão de copiar não encontrado.");
    }

    const textoOutput = document.getElementById("textoOutput");
    if (textoOutput) {
        textoOutput.style.visibility = "visible"; // Mostrar o texto
    } else {
        console.error("Elemento textoOutput não encontrado.");
    }
};

//* Função para remover diacríticos
const removerDiacriticos = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z\s]/g, "");
};

//* Função para criptografar o texto
const criptografar = () => {
    const inputTexto = document.querySelector("#inputTexto").value.trim();

    if (inputTexto) {
        const textoCriptografado = removerDiacriticos(inputTexto.toLowerCase())
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");

        exibirTextoSaida("#textoOutput", textoCriptografado);
        mostrarOutput();

        document.querySelector("#inputTexto").value = ""; // Limpar o campo de entrada
    } else {
        alert("Digite um texto válido para ser criptografado.");
    }
};

//* Função para descriptografar o texto
const descriptografar = () => {
    const inputTexto = document.querySelector("#inputTexto").value.trim();

    if (inputTexto) {
        const textoDescriptografado = removerDiacriticos(inputTexto.toLowerCase())
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");

        exibirTextoSaida("#textoOutput", textoDescriptografado);
        mostrarOutput();

        document.querySelector("#inputTexto").value = ""; // Limpar o campo de entrada
    } else {
        alert("Digite um texto válido para ser descriptografado.");
    }
};

//* Função para copiar o texto criptografado ou descriptografado
const copiarTexto = () => {
    const textoOutput = document.getElementById("textoOutput").innerText;

    if (textoOutput) {
        navigator.clipboard.writeText(textoOutput)
            .then(() => {
                alert("Texto copiado para a área de transferência.");

                // Limpa o texto exibido e restaura o estado original
                document.getElementById("textoOutput").innerText = "";
                document.getElementById("img-luffy").style.display = "block";
                exibirTextoSaida("h3", "Aqui irá aparecer seu texto poneglyph");

                // Oculta o botão de copiar e o texto
                const botaoCopiar = document.getElementById("botaoCopiar");
                if (botaoCopiar) {
                    botaoCopiar.style.display = "none"; // Ocultar botão de copiar
                }

                const textoOutputElemento = document.getElementById("textoOutput");
                if (textoOutputElemento) {
                    textoOutputElemento.style.visibility = "hidden"; // Ocultar texto
                }
            })
            .catch(() => {
                alert("Erro ao copiar texto.");
            });
    } else {
        console.error("Nenhum texto para copiar.");
    }
};

//* Adiciona eventos aos botões
document.getElementById("btnCriptografar").addEventListener("click", criptografar);
document.getElementById("btnDescriptografar").addEventListener("click", descriptografar);
document.getElementById("botaoCopiar").addEventListener("click", copiarTexto);

function animarPlaceholder() {
    const inputTexto = document.getElementById("inputTexto");
    const placeholderText = "Digite seu texto poneglyph...";
    let i = 0;

    function animar() {
        if (i < placeholderText.length) {
            inputTexto.setAttribute("placeholder", placeholderText.substring(0, i + 1));
            i++;
            setTimeout(animar, 200); // Velocidade da animação
        } else {
            i = 0;
            setTimeout(animar, 1000); // Tempo antes de reiniciar a animação
        }
    }

    animar();
}

animarPlaceholder();
