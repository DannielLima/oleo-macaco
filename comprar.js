function comprar() {
  const botao = document.getElementById("comprar");
  const barra = document.getElementById("barra-progresso");
  const mensagem = document.getElementById("mensagem-processo");
  const mensagens = [
    "Processando macacos...",
    "Extraindo essência primitiva...",
    "Invocando espíritos ancestrais...",
    "Destilando energia selvagem...",
    "Testando em pele de gorila...",
  ];

  botao.innerText = "Processando...";
  botao.disabled = true;
  barra.classList.remove("hidden");
  mensagem.classList.remove("hidden");

  let progresso = 0;
  const intervalo = setInterval(() => {
    progresso += Math.random() * 10;
    if (progresso > 90) progresso = 90;
    barra.style.width = progresso + "%";
    mensagem.innerText =
      mensagens[Math.floor(Math.random() * mensagens.length)];
  }, 800);

  setTimeout(() => {
    clearInterval(intervalo);
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: "Falha ao processar a compra. Seu navegador não é compatível com macacos.",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      barra.classList.add("hidden");
      mensagem.classList.add("hidden");
      botao.innerText = "Comprar Agora";
      botao.disabled = false;
    });
  }, 8000);
}
