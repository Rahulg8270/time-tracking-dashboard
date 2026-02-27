const activitiesContainer = document.querySelector("#activities-container");
const btn = document.querySelectorAll(".btn");
let stat__PreviousTimeFormat;

async function initDashboard() {
  const request = new Request("./data.json");
  const response = await fetch(request);
  const data = await response.json();

  renderUI(data, "daily");

  btn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;
      btn.forEach((BTN) => {
        BTN.classList.remove("active");
        BTN.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const currentTimeframe = target.getAttribute("data-name");
      renderUI(data, currentTimeframe);
    });
  });

  return data;
}

function renderUI(data, timeframe) {
  activitiesContainer.innerHTML = ``;

  if (timeframe === "daily") {
    stat__PreviousTimeFormat = "Yesterday - ";
  } else if (timeframe === "monthly") {
    stat__PreviousTimeFormat = "Last Month - ";
  } else {
    stat__PreviousTimeFormat = "Last Week - ";
  }

  data.forEach((card) => {
    let category = card.title.toLowerCase();
    for (let frame of Object.entries(card["timeframes"])) {
      if (frame[0] === timeframe) {
        console.log(frame);
        let currentTimeFrame = frame[1].current;
        let previousTimeFrame = frame[1].previous;
        // cardContainer.innerHTML = ``;
        activitiesContainer.innerHTML += `
          <article class="stat-card" >
            <div class="stat-card__outline" data-category="${category}">
            <div class="stat-card__content">
              <header class="stat-card__header">
                <h2 class="stat-card__title">${card.title}</h2>
                <button class="stat-card__btn-info" aria-label="more info about time spent on ${category}">
                  <img src="${"./images/icon-ellipsis.svg"}" alt="${category}" />
                </button>
              </header>
              <section class="stat-card__info ">
                <p class="stat-card__current">
                  ${currentTimeFrame > 1 ? `${currentTimeFrame}hrs` : `${currentTimeFrame}hr`}
                </p>
                <p class="stat-card__previous ">
                  ${stat__PreviousTimeFormat} ${previousTimeFrame > 1 ? `${previousTimeFrame}hrs` : `${previousTimeFrame}hr`}
                </p>
              </section>
            </div>
            </div>
          </article>
        `;
      }
    }
  });
}

initDashboard();
