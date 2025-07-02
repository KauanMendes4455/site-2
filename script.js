document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const emailInput = document.getElementById('emailUser');
  const resultadoDiv = document.getElementById('resultadoFinal');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const gabarito = {
      'pergunta 1': '1;3;5;7;11;13;17;19;23;29',
      'pergunta 2': 'não, pois é divisível por 7 e por 13 além de 1 e 91',
      'pergunta3': ['42'],
      'pergunta 4': 'y = x<sup>2</sup> + 2x - 4'
    };

    const normalizeText = (text) =>
      text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const email = emailInput.value.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      alert('Por favor, digite um email válido.');
      return;
    }

    let acertos = 0;
    let erros = 0;

    const p1 = document.querySelector('input[name="pergunta 1"]:checked');
    const p2 = document.querySelector('input[name="pergunta 2"]');
    const p3Selecionados = Array.from(document.querySelectorAll('input[name="pergunta3"]:checked')).map(el => el.value);
    const p4 = document.querySelector('input[name="pergunta 4"]:checked');

    if (p1 && p1.value === gabarito['pergunta 1']) acertos++; else erros++;
    if (p2 && normalizeText(p2.value) === normalizeText(gabarito['pergunta 2'])) acertos++; else erros++;
    if (
      p3Selecionados.length === gabarito['pergunta3'].length &&
      p3Selecionados.every(v => gabarito['pergunta3'].includes(v))
    ) acertos++; else erros++;
    if (p4 && p4.value.replace(/\s+/g, '') === gabarito['pergunta 4'].replace(/\s+/g, '')) acertos++; else erros++;

    const resumo = `
      Pergunta 1: ${p1 ? p1.value : 'sem resposta'}
      Pergunta 2: ${p2 ? p2.value.trim() : 'sem resposta'}
      Pergunta 3: ${p3Selecionados.join(', ') || 'sem resposta'}
      Pergunta 4: ${p4 ? p4.value : 'sem resposta'}
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

    // Exibe mensagem na tela
    resultadoDiv.innerHTML = `
      <p><strong>Resultado para ${email}</strong></p>
      <p>Acertos: ${acertos}</p>
      <p>Erros: ${erros}</p>
      <p>Seu resultado foi salvo com sucesso!</p>
    `;
  });
});
