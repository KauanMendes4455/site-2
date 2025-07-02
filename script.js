document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const emailInput = document.getElementById('email');
  const resultadoDiv = document.createElement('div');
  resultadoDiv.id = 'resultadoFinal';
  form.parentNode.insertBefore(resultadoDiv, form.nextSibling);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const gabarito = {
      pergunta1: "280 metros",
      pergunta2: "30 cm²",
      pergunta3: "50 metros",
      pergunta4: "8",
      pergunta5: "480m; 3840m; R$ 5760"
    };

    const email = emailInput.value.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      alert('Por favor, digite um email válido.');
      return;
    }

    let acertos = 0;
    let erros = 0;

    const p1 = document.querySelector('input[name="pergunta1"]:checked');
    const p2 = document.querySelector('input[name="pergunta2"]:checked');
    const p3 = document.querySelector('input[name="pergunta3"]:checked');
    const p4 = document.querySelector('input[name="pergunta4"]:checked');
    const p5 = document.querySelector('input[name="pergunta5"]:checked');

    if (p1 && p1.value === gabarito.pergunta1) acertos++; else erros++;
    if (p2 && p2.value === gabarito.pergunta2) acertos++; else erros++;
    if (p3 && p3.value === gabarito.pergunta3) acertos++; else erros++;
    if (p4 && p4.value === gabarito.pergunta4) acertos++; else erros++;
    if (p5 && p5.value === gabarito.pergunta5) acertos++; else erros++;

    const resumo = `
      Pergunta 1: ${p1 ? p1.value : '280 metros'}
      Pergunta 2: ${p2 ? p2.value : '30 cm²'}
      Pergunta 3: ${p3 ? p3.value : '50 metros'}
      Pergunta 4: ${p4 ? p4.value : '8'}
      Pergunta 5: ${p5 ? p5.value : '480m; 3840m; R$ 5760'}
    `;

    // Atualiza campos ocultos
    document.getElementById('campoAcertos').value = acertos;
    document.getElementById('campoErros').value = erros;
    document.getElementById('campoResumo').value = resumo.trim();

    // Armazena no localStorage
    const resultado = {
      acertos,
      erros,
      data: new Date().toLocaleString()
    };
    let banco = JSON.parse(localStorage.getItem('quizResultados') || '{}');
    banco[email] = resultado;
    localStorage.setItem('quizResultados', JSON.stringify(banco));

    // Exibe resultado na tela
    resultadoDiv.innerHTML = `
      <hr>
      <p><strong>Resultado para ${email}</strong></p>
      <p>Acertos: ${acertos}</p>
      <p>Erros: ${erros}</p>
      <p>Seu resultado foi salvo com sucesso!</p>
    `;
  });
});
