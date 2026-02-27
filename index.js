const stat_CardList = document.querySelector(".stat-cards-list");
const btn = document.querySelectorAll(".btn");

async function initDashboard() {
  const request = new Request("./data.json");
  const response = await fetch(request);
  const data = await response.json();

  renderUI(data, "daily");

  btn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.currentTarget;
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
  let statistic__cardHtml = ``;
  stat_CardList.innerHTML = ``;

  if (timeframe === "daily") {
    stat__PreviousTimeFormat = "Yesterday - ";
  } else if (timeframe === "monthly") {
    stat__PreviousTimeFormat = "Last Month - ";
  } else {
    stat__PreviousTimeFormat = "Last Week - ";
  }

  data.forEach((card) => {
    const category = card.title.toLowerCase();
    for (let frame of Object.entries(card["timeframes"])) {
      if (frame[0] === timeframe) {
        console.log(frame);
        let currentTimeFrame = frame[1].current;
        let previousTimeFrame = frame[1].previous;
        // cardContainer.innerHTML = ``;
        statistic__cardHtml += `
          <li class="stat-card" >
            <section class="stat-card__outline" data-category="${category}">
            <div class="stat-card__content">
              <header class="stat-card__header">
                <h2 class="stat-card__title">${card.title}</h2>
                <button type="button" class="stat-card__btn-info" aria-label="more info about ${category}">
                  <img src="${"./images/icon-ellipsis.svg"}" />
                </button>
              </header>
              <div class="stat-card__info ">
                <p class="stat-card__current">
                  ${currentTimeFrame > 1 ? `${currentTimeFrame}hrs` : `${currentTimeFrame}hr`}
                </p>
                <p class="stat-card__previous ">
                  ${stat__PreviousTimeFormat} ${previousTimeFrame > 1 ? `${previousTimeFrame}hrs` : `${previousTimeFrame}hr`}
                </p>
              </div>
            </div>
            </section>
          </li>
        `;
      }
    }
  });
  stat_CardList.innerHTML = statistic__cardHtml;
}

initDashboard();
