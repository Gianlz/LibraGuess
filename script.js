const palavras = {
    // Alimentos
    'água': 'aguaSm_Prog001',
    'arroz': 'arrozSm_Prog001',
    'banana': 'bananaSm_Prog001',
    'morango': 'morangoSm_Prog001',
    'café': 'cafeSm_Prog001',
    'carne': 'carneSm_Prog001',
    'feijão': 'feijaoSm_Prog001',
    'pizza': 'pizza2Sm_Prog001',
    'azeite': 'azeiteSm_Prog001',

    // Cores
    'amarelo': 'amareloSm_Prog001',
    'azul': 'azulSm_Prog001',
    'preto': 'preto1Sm_Prog001',
    'verde': 'verdeSm_Prog001',
    'vermelho': 'vermelhoSm_Prog001',

    // Animais
    'cachorro': 'cachorroSm_Prog001',
    'gato': 'gatoSm_Prog001',
    'pássaro': 'passaroSm_Prog001',
    'peixe': 'peixe1Sm_Prog001',
    'coelho': 'coelhoSm_Prog001',
    'cavalo': 'cavaloSm_Prog001',

    // Família
    'familia': 'familiaSm_Prog001',
    'filho': 'filhoSm_Prog001',
    'irmão': 'irmaoSm_Prog001',
    'mãe': 'mamae1Sm_Prog001',
    'pai': 'pai2Sm_Prog001',

    // Números
    'um': 'um1Sm_Prog001',
    'dois': 'dois1Sm_Prog001',
    'três': 'tres1Sm_Prog001',
    'quatro': 'quatroSm_Prog001',
    'cinco': 'cincoSm_Prog001',

    // Outros
    'tudo bem': 'bom1Sm_Prog001',
    'casa': 'casaSm_Prog001',
    'escola': 'escolaSm_Prog001',
    'hospital': 'hospitalSm_Prog001',
    'igreja': 'igrejaSm_Prog001',
    'livro': 'livroSm_Prog001',
    'nome': 'nomeSm_Prog001',
    'obrigado': 'obrigado1Sm_Prog001',
    'oi': 'oiSm_Prog001',
    'por favor': 'por_favorSm_Prog001',
    'professor': 'professorSm_Prog001',
    'trabalhar': 'trabalharSm_Prog001',
    'bonito': 'bonitoSm_Prog001',
    'viajar': 'viajarSm_Prog001',
    'cinema': 'cinemaSm_Prog001',
    'gostar': 'gostarSm_Prog001',
    'precisar': 'precisarSm_Prog001',
    'curso': 'cursoSm_Prog001',
    'aprender': 'aprenderSm_Prog001',
    'roupa': 'roupaSm_Prog001',
};

let palavraAtual = '';
let pontuacao = 0;
let palavrasDisponiveis = [];
let totalAcertos = 0;
let totalErros = 0;
let questaoAtual = 1;
let totalQuestoes = 10; // valor padrão
let palavrasRespondidas = new Set();
let questoesDisponiveis = Object.keys(palavras);

function iniciarJogo() {
    const numQuestoesInput = document.getElementById('numQuestoes');
    const numQuestoes = parseInt(numQuestoesInput.value);

    // Validação do número de questões
    if (isNaN(numQuestoes) || numQuestoes < 2 || numQuestoes > 50) {
        alert('Por favor, escolha entre 2 e 50 questões.');
        return;
    }

    // Resetar variáveis do jogo
    pontuacao = 0;
    totalAcertos = 0;
    totalErros = 0;
    questaoAtual = 1;
    palavrasRespondidas = new Set();

    // Configurar o jogo
    totalQuestoes = numQuestoes;
    palavrasDisponiveis = [...Object.keys(palavras)]
        .sort(() => Math.random() - 0.5)
        .slice(0, totalQuestoes);

    // Resetar elementos visuais
    document.getElementById('pontuacao').textContent = '0';
    document.getElementById('setupGame').style.display = 'none';
    document.getElementById('gameArea').style.display = 'flex';

    const resposta = document.getElementById('resposta');
    resposta.value = '';
    resposta.disabled = false;
    resposta.style.display = 'block';

    document.getElementById('btnVerificar').disabled = true;
    document.querySelector('.btn-warning').disabled = false;
    document.getElementById('btnProxima').style.display = 'none';
    document.getElementById('feedback').textContent = '';
    document.getElementById('instrucoes').style.display = 'block';
    document.getElementById('contadorQuestoes').style.display = 'block';

    // Iniciar primeiro desafio
    novoDesafio();
}

function verificarInput() {
    const resposta = document.getElementById('resposta').value.trim();
    const btnVerificar = document.getElementById('btnVerificar');
    btnVerificar.disabled = resposta === '';
}

function atualizarContadorQuestoes() {
    const contador = document.getElementById('contadorQuestoes');
    contador.textContent = `Questão ${questaoAtual} de ${totalQuestoes}`;
}

function verificarResposta() {
    const resposta = document.getElementById('resposta').value.toLowerCase().trim();
    const feedback = document.getElementById('feedback');
    const inputResposta = document.getElementById('resposta');
    const btnPular = document.querySelector('.btn-warning');

    feedback.style.display = 'block';

    if (resposta === palavraAtual) {
        pontuacao += 10;
        totalAcertos++;
        feedback.textContent = 'Correto! +10 pontos';
        feedback.style.color = 'green';
        document.getElementById('pontuacao').textContent = pontuacao;
        document.getElementById('btnProxima').style.display = 'inline-block';
        document.getElementById('btnVerificar').disabled = true;
        btnPular.disabled = true;
    } else {
        totalErros++;
        feedback.textContent = 'Incorreto. A palavra correta era: ' + palavraAtual;
        feedback.style.color = 'red';
        document.getElementById('btnProxima').style.display = 'inline-block';
        document.getElementById('btnVerificar').disabled = true;
        inputResposta.disabled = true;
        btnPular.disabled = true;
    }
}

function proximaPalavra() {
    const inputResposta = document.getElementById('resposta');
    const btnPular = document.querySelector('.btn-warning');

    inputResposta.disabled = false;
    btnPular.disabled = false;
    novoDesafio(true);
    document.getElementById('btnProxima').style.display = 'none';
    document.getElementById('btnVerificar').disabled = true;
}

function novoDesafio(removePalavraAtual = false) {
    // Só remove a palavra atual se não for o primeiro desafio
    if (removePalavraAtual && palavraAtual) {
        palavrasDisponiveis = palavrasDisponiveis.filter(p => p !== palavraAtual);
        palavrasRespondidas.add(palavraAtual);
        questaoAtual++;
    }

    // Verifica se o jogo acabou
    if (palavrasRespondidas.size >= totalQuestoes) {
        mostrarResultadoFinal();
        return;
    }

    // Seleciona nova palavra
    const indexAleatorio = Math.floor(Math.random() * palavrasDisponiveis.length);
    palavraAtual = palavrasDisponiveis[indexAleatorio];

    // Atualiza interface
    document.getElementById('resposta').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('btnProxima').style.display = 'none';
    document.getElementById('btnVerificar').disabled = true;

    atualizarContadorQuestoes();
    reproduzirSinal();
}

function pularPalavra() {
    const palavraAtualTemp = palavraAtual;
    do {
        const indexAleatorio = Math.floor(Math.random() * palavrasDisponiveis.length);
        palavraAtual = palavrasDisponiveis[indexAleatorio];
    } while (palavraAtual === palavraAtualTemp && palavrasDisponiveis.length > 1);

    document.getElementById('resposta').value = '';
    document.getElementById('feedback').textContent = '';
    reproduzirSinal();
}

function reproduzirSinal() {
    const video = document.getElementById('videoLibras');
    const baseUrl = 'https://www.ines.gov.br/dicionario-de-libras/public/media/palavras/videos/';
    video.src = `${baseUrl}${palavras[palavraAtual]}.mp4`;
    video.play();
}

function mostrarResultadoFinal() {
    const videoContainer = document.getElementById('videoContainer');
    const botoesJogo = document.querySelectorAll('#gameArea button');
    const inputResposta = document.getElementById('resposta');
    const instrucoes = document.getElementById('instrucoes');
    const contadorQuestoes = document.getElementById('contadorQuestoes');
    const feedback = document.getElementById('feedback');
    const pontuacaoElement = document.querySelector('p:has(#pontuacao)');

    botoesJogo.forEach(botao => botao.style.display = 'none');
    inputResposta.style.display = 'none';
    instrucoes.style.display = 'none';
    contadorQuestoes.style.display = 'none';
    feedback.style.display = 'none';
    pontuacaoElement.style.display = 'none';

    videoContainer.innerHTML = `
        <div class="resultado-final">
            <h2>Jogo Finalizado!</h2>
            <p>Total de Questões: ${totalQuestoes}</p>
            <p>Total de Acertos: ${totalAcertos}</p>
            <p>Total de Erros: ${totalErros}</p>
            <p>Pontuação Final: ${pontuacao}</p>
            <button onclick="voltarTelaInicial()" class="btn-primary">Jogar Novamente</button>
        </div>
    `;
}

function voltarTelaInicial() {
    // Resetar variáveis do jogo
    pontuacao = 0;
    totalAcertos = 0;
    totalErros = 0;
    questaoAtual = 1;
    palavrasDisponiveis = [];
    palavrasRespondidas = new Set();

    // Resetar elementos visuais
    document.getElementById('pontuacao').textContent = '0';

    // Restaurar o videoContainer ao estado original
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `
        <video id="videoLibras" controls>
            Seu navegador não suporta vídeos.
        </video>
    `;

    // Restaurar todos os elementos escondidos
    document.getElementById('instrucoes').style.display = 'block';
    document.getElementById('contadorQuestoes').style.display = 'block';
    document.getElementById('resposta').style.display = 'block';
    document.getElementById('btnVerificar').style.display = 'inline-block';
    document.querySelector('.btn-warning').style.display = 'inline-block';
    document.querySelector('.score-container').style.display = 'block';
    document.getElementById('feedback').style.display = 'block';

    // Resetar estado dos botões
    document.getElementById('btnVerificar').disabled = true;
    document.querySelector('.btn-warning').disabled = false;
    document.getElementById('btnProxima').style.display = 'none';

    // Limpar feedback e resposta
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').style.color = '';
    document.getElementById('resposta').value = '';
    document.getElementById('resposta').disabled = false;

    // Esconder área do jogo e mostrar setup
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('setupGame').style.display = 'block';

    // Resetar input de número de questões para o valor padrão
    const numQuestoesInput = document.getElementById('numQuestoes');
    numQuestoesInput.value = '10';
}

// Remover a chamada novoDesafio() do window.onload
window.onload = function () {
    document.getElementById('resposta').addEventListener('input', verificarInput);
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('setupGame').style.display = 'block';
};
