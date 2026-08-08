const KEY = "footballCareerV2";

const defaultData = {
  profile: {
    name: "Feliciano",
    age: 19,
    position: "Defesa Central / Lateral",
    foot: "Direito",
    height: "",
    weight: "",
    club: "",
    location: "",
    bio: "Objetivo: tornar-me jogador profissional."
  },

  skills: {
    Velocidade: 65,
    Força: 85,
    Agilidade: 82,
    Antecipação: 60,
    Calma: 58,
    Passe: 72,
    Desarme: 80,
    Posicionamento: 80,
    "Jogo aéreo": 75,
    Comunicação: 78
  },

  trainings: [],
  games: [],
  goals: [],
  videos: [],
  opportunities: [],
  darkMode: false
};

let data = loadData();

function loadData() {
  try {
    const saved = localStorage.getItem(KEY);

    if (!saved) {
      return structuredClone(defaultData);
    }

    return {
      ...structuredClone(defaultData),
      ...JSON.parse(saved)
    };
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(KEY, JSON.stringify(data));
  renderAll();
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* NAVEGAÇÃO */

function showPage(id) {
  document.querySelectorAll(".page")
    .forEach(page => page.classList.remove("active"));

  const page = document.getElementById(id);

  if (page) {
    page.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* PERFIL */

function saveProfile() {
  const fields = [
    "name",
    "age",
    "position",
    "foot",
    "height",
    "weight",
    "club",
    "location",
    "bio"
  ];

  fields.forEach(field => {
    const element = document.getElementById(field);

    if (element) {
      data.profile[field] = element.value;
    }
  });

  saveData();

  alert("Perfil guardado!");
}


/* TREINOS */

function addTraining() {
  const name = prompt("Nome do treino:");

  if (!name) return;

  const details = prompt(
    "Detalhes do treino:",
    "Ex.: 5 × 20 metros"
  );

  data.trainings.push({
    id: Date.now(),
    name,
    details: details || "",
    completed: false
  });

  saveData();
}

function toggleTraining(id) {
  const training =
    data.trainings.find(item => item.id === id);

  if (!training) return;

  training.completed = !training.completed;

  saveData();
}


/* JOGOS */

function addGame() {
  const opponent = prompt("Adversário:");

  if (!opponent) return;

  const rating = Number(
    prompt("Nota do jogo de 0 a 10:", "7")
  );

  const minutes = Number(
    prompt("Minutos jogados:", "90")
  );

  const tackles = Number(
    prompt("Desarmes:", "0")
  );

  const interceptions = Number(
    prompt("Interceções:", "0")
  );

  data.games.push({
    id: Date.now(),
    opponent,
    rating: Math.max(0, Math.min(10, rating || 0)),
    minutes: minutes || 0,
    tackles: tackles || 0,
    interceptions: interceptions || 0,
    date: new Date().toLocaleDateString("pt-PT")
  });

  saveData();
}

function deleteGame(id) {
  data.games =
    data.games.filter(game => game.id !== id);

  saveData();
}


/* ATRIBUTOS */

function updateSkill(skill, value) {
  data.skills[skill] = Number(value);

  localStorage.setItem(
    KEY,
    JSON.stringify(data)
  );

  renderAll();
}


/* METAS */

function addGoal() {
  const name = prompt("Nova meta:");

  if (!name) return;

  data.goals.push({
    id: Date.now(),
    name,
    completed: false
  });

  saveData();
}

function toggleGoal(id) {
  const goal =
    data.goals.find(item => item.id === id);

  if (!goal) return;

  goal.completed = !goal.completed;

  saveData();
}


/* VÍDEOS */

function addVideo() {
  const title =
    document.getElementById("videoTitle").value.trim();

  const url =
    document.getElementById("videoUrl").value.trim();

  if (!title || !url) {
    alert("Preenche o título e o link.");
    return;
  }

  if (
    !url.startsWith("https://") &&
    !url.startsWith("http://")
  ) {
    alert("O link deve começar por http:// ou https://");
    return;
  }

  data.videos.push({
    id: Date.now(),
    title,
    url
  });

  document.getElementById("videoTitle").value = "";
  document.getElementById("videoUrl").value = "";

  saveData();
}

function deleteVideo(id) {
  data.videos =
    data.videos.filter(video => video.id !== id);

  saveData();
}


/* OPORTUNIDADES */

function addOpportunity() {
  const name =
    document.getElementById("oppName").value.trim();

  const date =
    document.getElementById("oppDate").value;

  const contact =
    document.getElementById("oppContact").value.trim();

  if (!name) {
    alert("Indica o nome da oportunidade.");
    return;
  }

  data.opportunities.push({
    id: Date.now(),
    name,
    date,
    contact
  });

  document.getElementById("oppName").value = "";
  document.getElementById("oppDate").value = "";
  document.getElementById("oppContact").value = "";

  saveData();
}

function deleteOpportunity(id) {
  data.opportunities =
    data.opportunities.filter(
      opportunity => opportunity.id !== id
    );

  saveData();
}


/* MÉDIA */

function getAverageRating() {
  if (!data.games.length) {
    return "—";
  }

  const total =
    data.games.reduce(
      (sum, game) =>
        sum + Number(game.rating || 0),
      0
    );

  return (total / data.games.length).toFixed(1);
}


/* PROGRESSO */

function getCareerProgress() {
  const goals =
    data.goals.length
      ? data.goals.filter(
          goal => goal.completed
        ).length / data.goals.length
      : 0;

  const trainings =
    Math.min(
      data.trainings.filter(
        training => training.completed
      ).length / 10,
      1
    );

  return Math.round(
    (goals * 0.6 + trainings * 0.4) * 100
  );
}


/* DASHBOARD */

function renderDashboard() {
  const p = data.profile;

  document.getElementById("playerName").textContent =
    p.name || "Jogador";

  document.getElementById("playerPosition").textContent =
    p.position || "";

  const initials =
    (p.name || "FC")
      .split(" ")
      .slice(0, 2)
      .map(x => x[0])
      .join("")
      .toUpperCase();

  document.getElementById("avatar").textContent =
    initials;

  document.getElementById("progress").textContent =
    getCareerProgress() + "%";

  document.getElementById("trainingCount").textContent =
    data.trainings.filter(
      training => training.completed
    ).length;

  document.getElementById("gameCount").textContent =
    data.games.length;

  document.getElementById("averageRating").textContent =
    getAverageRating();

  document.getElementById("homeSkills").innerHTML =
    Object.entries(data.skills)
      .slice(0, 6)
      .map(([skill, value]) => `
        <div class="skill">

          <span>
            ${escapeHTML(skill)}
          </span>

          <div class="bar">
            <i style="width:${value}%"></i>
          </div>

          <b>${value}</b>

        </div>
      `)
      .join("");
}


/* TREINOS */

function renderTrainings() {
  const container =
    document.getElementById("trainings");

  if (!container) return;

  if (!data.trainings.length) {
    container.innerHTML = `
      <div class="panel">
        Ainda não tens treinos.
      </div>
    `;

    return;
  }

  container.innerHTML =
    data.trainings.map(training => `
      <div class="item ${training.completed ? "done" : ""}">

        <div>
          <strong>
            ${escapeHTML(training.name)}
          </strong>

          <div class="muted">
            ${escapeHTML(training.details)}
          </div>
        </div>

        <button
          class="secondary"
          onclick="toggleTraining(${training.id})">

          ${training.completed
            ? "Reabrir"
            : "Concluir"}

        </button>

      </div>
    `).join("");
}


/* JOGOS */

function renderGames() {
  const container =
    document.getElementById("gamesList");

  if (!container) return;

  if (!data.games.length) {
    container.innerHTML = `
      <div class="panel">
        Ainda não registaste nenhum jogo.
      </div>
    `;

    return;
  }

  container.innerHTML =
    data.games
      .slice()
      .reverse()
      .map(game => `
        <div class="item">

          <div>

            <strong>
              ${escapeHTML(game.opponent)}
            </strong>

            <div class="muted">
              ${game.date}
              · ${game.minutes} min
              · Nota ${game.rating}/10
            </div>

            <div class="muted">
              🛡️ Desarmes: ${game.tackles}
              · Interceções: ${game.interceptions}
            </div>

          </div>

          <button
            class="secondary"
            onclick="deleteGame(${game.id})">

            Eliminar

          </button>

        </div>
      `)
      .join("");
}


/* ATRIBUTOS */

function renderSkills() {
  const container =
    document.getElementById("skills");

  if (!container) return;

  container.innerHTML =
    Object.entries(data.skills)
      .map(([skill, value]) => `
        <div class="skill">

          <span>
            ${escapeHTML(skill)}
          </span>

          <input
            type="range"
            min="0"
            max="100"
            value="${value}"
            oninput="
              updateSkill(
                '${skill}',
                this.value
              )
            "
          >

          <b>${value}</b>

        </div>
      `)
      .join("");
}


/* METAS */

function renderGoals() {
  const container =
    document.getElementById("goalsList");

  if (!container) return;

  const completed =
    data.goals.filter(
      goal => goal.completed
    ).length;

  const percentage =
    data.goals.length
      ? Math.round(
          completed /
          data.goals.length *
          100
        )
      : 0;

  document.getElementById(
    "goalProgress"
  ).textContent =
    percentage + "%";

  document.getElementById(
    "goalBar"
  ).style.width =
    percentage + "%";

  container.innerHTML =
    data.goals.map(goal => `
      <div class="item ${goal.completed ? "done" : ""}">

        <strong>
          ${escapeHTML(goal.name)}
        </strong>

        <button
          class="secondary"
          onclick="toggleGoal(${goal.id})">

          ${goal.completed
            ? "Reabrir"
            : "Concluir"}

        </button>

      </div>
    `).join("");
}


/* VÍDEOS */

function renderVideos() {
  const container =
    document.getElementById("videos");

  if (!container) return;

  if (!data.videos.length) {
    container.innerHTML = `
      <div class="panel">
        Ainda não tens vídeos.
      </div>
    `;

    return;
  }

  container.innerHTML =
    data.videos.map(video => `
      <div class="item">

        <div>
          <strong>
            ${escapeHTML(video.title)}
          </strong>

          <div class="muted">
            ${escapeHTML(video.url)}
          </div>
        </div>

        <div>

          <a
            class="secondary"
            href="${escapeHTML(video.url)}"
            target="_blank">

            Abrir

          </a>

          <button
            class="secondary"
            onclick="deleteVideo(${video.id})">

            ×

          </button>

        </div>

      </div>
    `)
    .join("");
}


/* OPORTUNIDADES */

function renderOpportunities() {
  const container =
    document.getElementById(
      "opportunityList"
    );

  if (!container) return;

  if (!data.opportunities.length) {
    container.innerHTML = `
      <div class="panel">
        Nenhuma oportunidade registada.
      </div>
    `;

    return;
  }

  container.innerHTML =
    data.opportunities
      .map(opportunity => `
        <div class="item">

          <div>

            <strong>
              ${escapeHTML(
                opportunity.name
              )}
            </strong>

            <div class="muted">

              ${opportunity.date || "Sem data"}

              ${
                opportunity.contact
                  ? " · " +
                    escapeHTML(
                      opportunity.contact
                    )
                  : ""
              }

            </div>

          </div>

          <button
            class="secondary"
            onclick="deleteOpportunity(
              ${opportunity.id}
            )">

            ×

          </button>

        </div>
      `)
      .join("");
}


/* CV */

function renderCV() {
  const container =
    document.getElementById("cv");

  if (!container) return;

  const p = data.profile;

  container.innerHTML = `

    <h3>
      ${escapeHTML(p.name)}
    </h3>

    <strong>
      ${escapeHTML(p.position)}
    </strong>

    <p>
      ${escapeHTML(p.age)}
      anos ·
      ${escapeHTML(p.foot)}
      ·
      ${escapeHTML(p.height || "—")} cm
      ·
      ${escapeHTML(p.weight || "—")} kg
    </p>

    <p>
      Clube:
      ${escapeHTML(p.club || "—")}
      <br>
      Local:
      ${escapeHTML(p.location || "—")}
    </p>

    <p>
      ${escapeHTML(p.bio || "")}
    </p>

  `;
}


/* PDF */

function printCV() {
  const p = data.profile;

  const win =
    window.open("", "_blank");

  win.document.write(`
    <html>

      <head>

        <title>
          CV - ${escapeHTML(p.name)}
        </title>

        <style>

          body {
            font-family: Arial;
            max-width: 750px;
            margin: 40px auto;
            padding: 20px;
          }

          h1 {
            color: #087443;
          }

        </style>

      </head>

      <body>

        <h1>
          ${escapeHTML(p.name)}
        </h1>

        <h2>
          ${escapeHTML(p.position)}
        </h2>

        <p>
          ${escapeHTML(p.age)} anos ·
          ${escapeHTML(p.foot)} ·
          ${escapeHTML(p.height || "—")} cm ·
          ${escapeHTML(p.weight || "—")} kg
        </p>

        <p>
          Clube:
          ${escapeHTML(p.club || "—")}
        </p>

        <p>
          Local:
          ${escapeHTML(p.location || "—")}
        </p>

        <p>
          ${escapeHTML(p.bio || "")}
        </p>

        <h3>
          Atributos
        </h3>

        <p>
          ${
            Object.entries(data.skills)
              .map(
                ([skill, value]) =>
                  `${escapeHTML(skill)}: ${value}`
              )
              .join(" · ")
          }
        </p>

      </body>

    </html>
  `);

  win.document.close();

  win.print();
}


/* MODO ESCURO */

function toggleDarkMode() {

  data.darkMode =
    !data.darkMode;

  document.body.classList.toggle(
    "dark",
    data.darkMode
  );

  localStorage.setItem(
    KEY,
    JSON.stringify(data)
  );

  updateThemeButton();
}

function updateThemeButton() {

  const button =
    document.getElementById(
      "themeBtn"
    );

  if (button) {
    button.textContent =
      data.darkMode
        ? "☀️"
        : "🌙";
  }

}


/* RENDER */

function renderAll() {

  renderDashboard();

  renderTrainings();

  renderGames();

  renderSkills();

  renderGoals();

  renderVideos();

  renderOpportunities();

  renderCV();

  document.body.classList.toggle(
    "dark",
    data.darkMode
  );

  updateThemeButton();

}


/* INICIALIZAÇÃO */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const fields = [
      "name",
      "age",
      "position",
      "foot",
      "height",
      "weight",
      "club",
      "location",
      "bio"
    ];

    fields.forEach(field => {

      const element =
        document.getElementById(field);

      if (element) {

        element.value =
          data.profile[field] || "";

      }

    });

    const theme =
      document.getElementById(
        "themeBtn"
      );

    if (theme) {
      theme.onclick =
        toggleDarkMode;
    }

    renderAll();

  }
);
