const cardContainer = document.querySelector(
  ".time-tracking-dashboard__card-activities",
);
const btn = document.querySelectorAll(".btn");
let cardDiv = `
<div class="card-outline">
  <div class="card-content">
    <div class="card-top">
      <h2 class="card-top__title">title</h2>
      <button class="card-top__more-info">more Info</button>
    </div>
    <div class="card-middle">
      Current Time Frame
    </div>
    <div class="card-end">
      Previous Time Frame
    </div>
  </div>
</div>
`;

async function initDashboard() {
  const request = new Request("./data.json");
  const response = await fetch(request);
  const data = await response.json();

  renderUI(data, "daily");

  btn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;

      const currentTimeframe = target.getAttribute("data-name");
      renderUI(data, currentTimeframe);
    });
  });

  return data;
}

function renderUI(data, timeframe) {
  cardContainer.innerHTML = ``;
  data.forEach((card) => {
    for (let frame of Object.entries(card["timeframes"])) {
      if (frame[0] === timeframe) {
        console.log(frame);
        let currentTimeFrame = frame[1].current;
        let previousTimeFrame = frame[1].previous;
        // cardContainer.innerHTML = ``;
        cardContainer.innerHTML += `
          <div class="card-outline">
            <div class="card-content">
              <div class="card-top">
                <h2 class="card-top__title">${card.title}</h2>
                <button class="card-top__more-info">more Info</button>
              </div>
              <div class="card-middle">
                  <h1>${currentTimeFrame} hrs</h1>
              </div>
              <div class="card-end">
                  <p>${previousTimeFrame} hrs</p>
              </div>
            </div>
          </div>
        `;
      }
    }
  });
}

initDashboard();

// so we have a default time tracking cards,
// when we click on any button, that particular set of cards are being
