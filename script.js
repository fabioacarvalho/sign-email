function copySignatureSourceCode() {
    // Seleciona o conteúdo HTML da assinatura
    const signature = document.getElementById('emailSignature').outerHTML;

    // Cria um elemento temporário para copiar o conteúdo
    const tempElement = document.createElement('textarea');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    tempElement.value = signature;
    document.body.appendChild(tempElement);

    // Seleciona e copia o texto
    tempElement.select();
    document.execCommand('copy');

    // Remove o elemento temporário
    document.body.removeChild(tempElement);

    // Mostra uma notificação
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function copySignature() {
    // Cria um elemento temporário para copiar o conteúdo visível
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';

    // Clona o nó da assinatura
    const emailSignature = document.getElementById('emailSignature').cloneNode(true);

    // Copia estilos in-line
    copyStyles(document.getElementById('emailSignature'), emailSignature);

    // Garante que os ícones SVG sejam processados
    processSVGs(emailSignature);

    // Adiciona o elemento ao corpo
    tempElement.appendChild(emailSignature);
    document.body.appendChild(tempElement);

    // Seleciona e copia o conteúdo com estilos
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    // Remove o elemento temporário
    document.body.removeChild(tempElement);

    // Mostra uma notificação
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Função para copiar os estilos in-line
function copyStyles(sourceElement, targetElement) {
    const sourceStyles = window.getComputedStyle(sourceElement);

    for (let style of sourceStyles) {
        targetElement.style[style] = sourceStyles.getPropertyValue(style);
    }

    // Copia os estilos dos filhos
    Array.from(sourceElement.children).forEach((child, index) => {
        copyStyles(child, targetElement.children[index]);
    });
};

// Função para processar SVGs e garantir que sejam preservados
function processSVGs(element) {
    const svgs = element.querySelectorAll('svg');

    svgs.forEach((svg) => {
        // Serializa o SVG como uma string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        // Cria uma nova imagem in-line usando o SVG
        const img = document.createElement('img');
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);

        // Substitui o SVG pelo elemento <img>
        svg.parentNode.replaceChild(img, svg);
    });
};




// function inlineCSS() {
//     const styles = document.styleSheets[0];  // Pega o primeiro styleSheet
//     const styleRules = Array.from(styles.cssRules);  // Converte as regras em um array

//     const table = document.getElementById("emailSignature");  // Pega a tabela com id 'emailSignature'
//     const elements = table.querySelectorAll('*');  // Pega todos os elementos dentro dessa tabela

//     elements.forEach(element => {
//       const elementClasses = Array.from(element.classList);
//       let inlineStyles = '';

//       // Aplica os estilos CSS da classe no elemento
//       styleRules.forEach(rule => {
//         if (elementClasses.some(className => rule.selectorText.includes(className))) {
//           inlineStyles += rule.style.cssText;  // Concatena os estilos em uma string
//         }
//       });

//       // Aplica os estilos inline no elemento
//       if (inlineStyles) {
//         element.setAttribute('style', inlineStyles);
//       }
//     });

//     // Retorna o código HTML final, agora com os estilos inline
//     return table.outerHTML;
// };

// function copyToClipboard() {
//     const inlineHTML = inlineCSS();  // Obtém o HTML com os estilos inline

//     // Cria um campo de texto temporário para copiar o conteúdo
//     const textarea = document.createElement('textarea');
//     textarea.value = inlineHTML;  // Coloca o HTML no valor do textarea
//     document.body.appendChild(textarea);
//     textarea.select();  // Seleciona o conteúdo do textarea
//     document.execCommand('copy');  // Copia para a área de transferência
//     document.body.removeChild(textarea);  // Remove o textarea do DOM

//     alert('Assinatura copiada para a área de transferência!');
// };





function updateText(elementId, targetId) {
    // Obtém o valor do input
    const inputValue = document.getElementById(elementId).value;

    // Verifica se é o campo "phone" e aplica formatação adequada
    let formattedValue;
    if (elementId === "phone") {
        // Exemplo: Formatar número de telefone (você pode ajustar para o formato desejado)
        formattedValue = inputValue.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (formattedValue.length > 10) {
            formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (formattedValue.length > 6) {
            formattedValue = formattedValue.replace(/^(\d{2})(\d{4})(\d+)$/, '($1) $2-$3');
        }
    } else {
        // Formata para separador de milhares
        formattedValue = inputValue;
    }

    // Atualiza o texto no elemento alvo
    document.getElementById(targetId).innerText = formattedValue;

    // Verifica se precisa atualizar o `href` (caso seja email, telefone ou site)
    if (["email", "phone", "site"].includes(elementId)) {
        updateHref(elementId, targetId);
    }
};

function updateSrc(inputId, targetId) {
    // Obtém o valor do input
    const inputValue = document.getElementById(inputId).value;

    // Atualiza o atributo href no elemento alvo
    document.getElementById(targetId).setAttribute('src', inputValue);
};

function updateHref(inputId, targetId) {
    // Obtém o valor do input
    const inputValue = document.getElementById(inputId).value;

    // Atualiza o atributo href no elemento alvo
    if(inputId == "email") {
        document.getElementById(targetId).setAttribute('href', `mailto:${inputValue}`);
        
    } else if(inputId == "phone") {
        document.getElementById(targetId).setAttribute('href', `https://api.whatsapp.com/send?phone=55${inputValue}`);
        
    } else if(inputId == "site") {
        document.getElementById(targetId).setAttribute('href', inputValue);
    } else {
        document.getElementById(targetId).setAttribute('src', inputValue);

    }

};

document.querySelectorAll('.block-two input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const targetId = this.id.replace('hd-', ''); // Supondo que o ID do elemento alvo seja derivado do checkbox
        const targetElement = document.getElementById(`${targetId}-sign`); // Obtém o elemento correspondente pelo ID
        
        if (this.checked) {
            targetElement.setAttribute('hidden', ''); // Adiciona o afalse); hidden
        } else {
            targetElement.removeAttribute('hidden'); // Remove o atributo hidden
        }
    });
});