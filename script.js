// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Registrar acesso (se ainda não foi enviado)
    registrarAcesso();
    
    // Configurar evento de envio do formulário
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        processarFormulario();
    });
    
    // Configurar eventos para campos "Outro"
    configurarCamposOutro();
    
    // Adicionar animações de entrada aos cards
    animarCards();
});

// Animar cards na entrada
function animarCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animationDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Configurar campos "Outro" para mostrar input de texto
function configurarCamposOutro() {
    // Aplicativo favorito
    const radiosApp = document.querySelectorAll('input[name="appFavorito"]');
    const inputAppOutro = document.getElementById('appFavoritoOutroInput');
    
    radiosApp.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Outro') {
                inputAppOutro.style.display = 'block';
                inputAppOutro.required = true;
                inputAppOutro.focus();
            } else {
                inputAppOutro.style.display = 'none';
                inputAppOutro.required = false;
                inputAppOutro.value = '';
            }
        });
    });
    
    // Loja de compras
    const radiosLoja = document.querySelectorAll('input[name="lojaCompras"]');
    const inputLojaOutro = document.getElementById('lojaComprasOutroInput');
    
    radiosLoja.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Outro') {
                inputLojaOutro.style.display = 'block';
                inputLojaOutro.required = true;
                inputLojaOutro.focus();
            } else {
                inputLojaOutro.style.display = 'none';
                inputLojaOutro.required = false;
                inputLojaOutro.value = '';
            }
        });
    });
}

// Registrar acesso ao formulário
function registrarAcesso() {
    const enviado = localStorage.getItem('formularioEnviado');
    if (!enviado || enviado !== 'true') {
        // Incrementar contador de acessos
        let acessos = parseInt(localStorage.getItem('totalAcessos') || '0');
        acessos++;
        localStorage.setItem('totalAcessos', acessos.toString());
    }
}

// Processar envio do formulário
function processarFormulario() {
    // Coletar respostas
    const formData = new FormData(document.getElementById('formulario'));
    const respostas = {};
    
    // Coletar todos os campos
    for (let [key, value] of formData.entries()) {
        respostas[key] = value;
    }
    
    // Coletar radio buttons
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        respostas[radio.name] = radio.value;
    });
    
    // Processar campos "Outro" - substituir "Outro" pelo valor digitado
    if (respostas.appFavorito === 'Outro' && respostas.appFavoritoOutro) {
        respostas.appFavorito = respostas.appFavoritoOutro;
    }
    
    if (respostas.lojaCompras === 'Outro' && respostas.lojaComprasOutro) {
        respostas.lojaCompras = respostas.lojaComprasOutro;
    }
    
    // Marcar como enviado
    localStorage.setItem('formularioEnviado', 'true');
    
    
    // Esconder formulário e aviso inicial
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('avisoInicial').style.display = 'none';
    
    // Mostrar resultado
    mostrarResultado(respostas);
}

// Mostrar resultado após envio
function mostrarResultado(respostas) {
    const resultado = document.getElementById('resultado');
    
    // Scroll imediato para o topo ANTES de mostrar resultados
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Mostrar resultado com animação
    resultado.style.display = 'block';
    resultado.style.opacity = '0';
    resultado.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultado.style.transition = 'all 0.5s ease';
        resultado.style.opacity = '1';
        resultado.style.transform = 'translateY(0)';
    }, 100);
    
    // Exibir respostas do usuário com animação
    exibirRespostasComAnimacao(respostas);
    
    // Garantir que está no topo após renderizar
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Scroll suave após garantir posição
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }, 200);
}

// Exibir mensagem de conscientização sobre privacidade
function exibirRespostas(respostas) {
    const respostasBox = document.getElementById('respostasUsuario');
    
    // Extrair dados das respostas
    const nome = respostas.primeiroNome || '[nome]';
    const nomeRedesSociais = respostas.nomeRedesSociais || '[nome das redes sociais]';
    const regiao = respostas.bairroRegiao || '[região]';
    const celular = respostas.modeloCelular || '[modelo do celular]';
    const loja = respostas.lojaCompras || '[loja preferida]';
    const horario = respostas.horario || '[horário]';
    const appFavorito = respostas.appFavorito || '[aplicativo favorito]';
    const wifiPublico = respostas.wifiPublico || '[frequência de Wi-Fi público]';
    const celularRoubado = respostas.celularRoubado || '[histórico de celular roubado/perdido]';
    const clicaLinks = respostas.clicaLinks || '[hábito de clicar em links]';
    
    // Criar mensagem personalizada de conscientização (texto original mais simples)
    const mensagemConscientizacao = `
        <div class="mensagem-assustadora">
            <p><strong>Opa, ${nome}!</strong></p>
            <p>Só um aviso rápido, mas importante: a gente pegou todos os seus dados.</p>
            <p>Com seu nome de redes sociais "${nomeRedesSociais}" consigo achar seus perfis, fotos, comentários... Agora sei onde você está a maior parte do dia: ${regiao}. Sei onde você passa mais tempo digitalmente: ${appFavorito}.</p>
            <p>Sei seu horário de maior atividade: ${horario}. Você compra principalmente em ${loja}, o que mostra seu perfil de consumo. Seu celular ${celular} indica seu nível de gasto e perfil digital.</p>
            <p>Você usa Wi-Fi público ${wifiPublico.toLowerCase()}, perfeito para interceptação. Sei que você já passou por ${celularRoubado.toLowerCase()}, e isso indica seus hábitos de segurança. E você ${clicaLinks.toLowerCase()} clica em links de amigos - isso é ouro para golpistas.</p>
            <p><strong>Viu só? Em menos de um minuto, você me deu todas essas informações.</strong></p>
            <p>O ponto é: se foi tão fácil para mim, que sou só um formulário simples, imagina para quem realmente quer fazer algo com seus dados.</p>
            <p><strong>Pense bem no que você compartilha online. A privacidade é uma ilusão bem frágil, não é? 😉</strong></p>
        </div>
    `;
    
    respostasBox.innerHTML = mensagemConscientizacao;
}
// Adicionar efeitos visuais aos inputs
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de foco nos inputs de texto
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Efeito de hover nos radio buttons
    const radioLabels = document.querySelectorAll('.radio-group label');
    radioLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });
        
        label.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Efeito de clique no botão enviar
    const btnEnviar = document.querySelector('.btn-enviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btnEnviar.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        btnEnviar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Adicionar efeito de digitação no aviso final
function adicionarEfeitoDigitacao() {
    const elementos = document.querySelectorAll('.mensagem-assustadora p, .warning-critical p, .warning-scary p, .warning-reality p');
    elementos.forEach((elemento, index) => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            elemento.style.transition = 'all 0.5s ease';
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Chamar o efeito de digitação após exibir as respostas
function exibirRespostasComAnimacao(respostas) {
    exibirRespostas(respostas);
    
    setTimeout(() => {
        adicionarEfeitoDigitacao();
    }, 500);
}