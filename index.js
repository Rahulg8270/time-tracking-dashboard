const stat_CardList = document.querySelector(".stat-cards-list");
const controlContainer = document.querySelector(".user-card__nav");

const getTimeframeLabel = (timeframe) => {
  const label = {
    daily: "Yesterday - ",
    weekly: "Last week - ",
    monthly: "Last month - ",
  };
  return label[timeframe] || "Previous - ";
};

const formatHours = (hrs) => `${hrs}${hrs === 1 ? "hr" : "hrs"}`;

const createCardTemplate = (card, timeframe, label) => {
  const { title, timeframes } = card;
  const { current, previous } = timeframes[timeframe];
  const category = title.toLowerCase();

  return `
    <li class="stat-card" >
            <section class="stat-card__outline" data-category="${category}">
            <div class="stat-card__content">
              <header class="stat-card__header">
                <h2 class="stat-card__title">${title}</h2>
                <button type="button" class="stat-card__btn-info" aria-label="more info about ${category}">
                  <img src="${"./images/icon-ellipsis.svg"}" />
                </button>
              </header>
              <div class="stat-card__info ">
                <p class="stat-card__current">
                  ${formatHours(current)}
                </p>
                <p class="stat-card__previous ">
                  ${label} ${formatHours(previous)}
                </p>
              </div>
            </div>
            </section>
          </li>
  `;
};

async function initDashboard() {
  try {
    const request = new Request("./data.json");
    const response = await fetch(request);
    const data = await response.json();
    // initial render
    updateUI(data, "daily");

    controlContainer.addEventListener("click", (e) => {
      const clickedButton = e.target.closest(".btn");

      // guard clause if the user clicks anywhere without the .btn class can be empty space or anything

      if (!clickedButton) return;

      const timeframe = clickedButton.getAttribute("data-name");
      setActiveButton(controlContainer, clickedButton);

      updateUI(data, timeframe);
    });
  } catch (error) {
    console.log("failed to load the dashboard", error);
  }
}

function updateUI(data, timeframe) {
  const label = getTimeframeLabel(timeframe);
  stat_CardList.innerHTML = data
    .map((card) => createCardTemplate(card, timeframe, label))
    .join("");
}

function setActiveButton(container, clickedButton) {
  const currentActive = container.querySelector(".btn.active");

  if (currentActive && currentActive !== clickedButton) {
    clickedButton.classList.remove("active");
    clickedButton.setAttribute("aria-pressed", "false");
  }

  clickedButton.classList.add("active");
  clickedButton.setAttribute("aria-pressed", "true");
}

initDashboard();
