let tentativas = 0;

function comprar() {
  tentativas++;
  const botao = document.getElementById("comprar");
  const barra = document.getElementById("barra-progresso");
  const mensagem = document.getElementById("mensagem-processo");

  if (tentativas >= 2) {
    modoBossFight();
    return;
  }

  botao.innerText = "Processando...";
  botao.disabled = true;
  barra.classList.remove("hidden");
  mensagem.classList.remove("hidden");

  let progresso = 0;
  const intervalo = setInterval(() => {
    progresso += Math.random() * 10;
    if (progresso > 90) progresso = 90;
    barra.style.width = `${progresso}%`;
  }, 400);

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
  }, 2000);
}

function modoBossFight() {
  let clicks = 0;
  let tempoRestante = 10;

  const container = document.body;
  const boss = document.createElement("div");
  boss.id = "boss";
  boss.innerHTML = `
    <div class='fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white z-50'>
      <img src='/images/macaco-boss.gif'/>
      <h1 class='text-3xl font-bold mt-4'>Modo Macaco! 🦍</h1>
      <p class='text-lg'>Clique rápido para derrotar o macaco!</p>
      <p id='contador-cliques' class='text-xl font-bold'>Cliques: 0</p>
      <p id='tempo-restante' class='text-lg'>Tempo restante: 10s</p>
      <button id='botao-lutar' class='mt-4 px-4 py-2 bg-red-500 text-white text-lg font-semibold rounded-lg'>Atacar!</button>
    </div>
  `;
  container.appendChild(boss);

  const botaoLutar = document.getElementById("botao-lutar");
  botaoLutar.addEventListener("click", () => {
    clicks++;
    document.getElementById(
      "contador-cliques"
    ).innerText = `Cliques: ${clicks}`;
  });

  const timer = setInterval(() => {
    tempoRestante--;
    document.getElementById(
      "tempo-restante"
    ).innerText = `Tempo restante: ${tempoRestante}s`;
    if (tempoRestante <= 0) {
      clearInterval(timer);
      finalizarBossFight(clicks);
    }
  }, 1000);
}

function finalizarBossFight(clicks) {
  document.getElementById("boss").remove();
  if (clicks >= 15) {
    Swal.fire({
      icon: "success",
      title: "Você derrotou o macaco! 🏆",
      text: "Agora pode comprar o Óleo de Macaco.",
      confirmButtonText: "OK",
    });
    tentativas = 0;
  } else {
    Swal.fire({
      icon: "error",
      title: "O macaco te derrotou! 💀",
      text: "Tente novamente.",
      confirmButtonText: "OK",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let inputBuffer = "";
  const secretCode = "podermacaco";

  document.addEventListener("keydown", (event) => {
    inputBuffer += event.key.toLowerCase();
    if (inputBuffer.length > secretCode.length) {
      inputBuffer = inputBuffer.slice(-secretCode.length);
    }

    if (inputBuffer === secretCode) {
      ativarModoRitualSecreto();
    }
  });
});

function ativarModoRitualSecreto() {
  document.body.classList.remove(
    "bg-gradient-to-br",
    "from-yellow-100",
    "to-yellow-50"
  );
  document.body.classList.add("ritual-secreto");

  setInterval(() => {
    document.body.classList.toggle("flash");
  }, 200);

  const raio = document.createElement("div");
  raio.classList.add("raio");
  document.body.appendChild(raio);
  setTimeout(() => raio.remove(), 2000);
}
