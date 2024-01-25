import axios from 'axios';

const exercisesList = document.querySelector(`.exercises-list`);
const exercisesListPages = document.querySelector(`.exercises-list-pages`);
exercisesList.addEventListener(`click`, makeTypeOfTrainingCards);
const formCard = document.querySelector(`.exercises-form`);
let currentPage = 1,
  perPage = 8,
  typeOfFilter = `Muscles`;

const filterButton = document.querySelectorAll(`.exercises-button`);
[...filterButton].map((b, i) => {
  if (i === 0) b.classList.add(`exercises-button-active`);
  b.addEventListener(`click`, filterExercises);
});
// =-======================================================
async function searchImageOnServer(
  getType,
  filter,
  currentPages,
  perPages,
  filterType,
  keyWord
) {
  // =====================
  let params = {};
  filterType
    ? (params[filter.toLowerCase().replace(` `, ``)] = filterType)
    : (params.filter = filter);
  //   if (filterType) {
  //     params[filter.toLowerCase().replace(` `, ``)] = filterType;
  //   }
  //   params.filter = filter;

  params.page = currentPages;
  params.limit = perPages;
  if (keyWord) params.keyword = keyWord;

  console.log(params);
  // ========================
  let parameters = new URLSearchParams(params).toString();
  console.log(parameters);
  try {
    const response = await axios.get(
      `https://energyflow.b.goit.study/api/${getType}?${parameters}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

filterExercises();
function filterExercises(e) {
  currentPage = 1;
  if (e) {
    const button = e.target;
    if (button.classList.contains(`exercises-button-active`)) return;
    typeOfFilter = button.dataset.name;
    document
      .querySelector(`.exercises-button-active`)
      .classList.remove(`exercises-button-active`);
    button.classList.add(`exercises-button-active`);
  }
  getExercisesFromServer(typeOfFilter);
}
async function getExercisesFromServer(typeOfFilter) {
  const list = await searchImageOnServer(
    `filters`,
    typeOfFilter,
    currentPage,
    perPage
  )
    .then(response => response)
    .catch(error => console.log(error));
  renderExercises(list.results, list.totalPages);
}

function renderExercises(arrow, totalPages) {
  if (arrow[0]._id) {
    console.log(arrow[0]._id);
    let listCodeCards = arrow.reduce(
      (
        acum,
        { _id, rating, name: names, burnedCalories, time, bodyPart, target }
      ) => {
        return (acum += `<li class="exer-card-item">
          <div class="exer-card-background">
            <div class="card-workout-wrapper">
              <p class="exer-workout-text">WORKOUT</p>
              <p class="exer-card-rating">${rating}</p>
              <svg class="card-rating-svg" width="14" height="14">
                <use href="./img/symbol-defs.svg#icon-star"></use>
              </svg>
              <button class="card-start-button">
                Start
                <svg class="card-arrow-svg" width="14" height="14">
                  <use href="./img/symbol-defs.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>
            <div class="card-runing-men-wrapper">
              <svg class="card-runing-men-svg" width="24" height="24">
                <use href="../img/symbol-defs.svg#icon-running-men"></use>
              </svg>
              <span class="card-name-traning">${names}
            </span></div>
            <p class="card-burned-calories-text">Burned calories:
            <span class="card-burned-calories-span">${burnedCalories} / ${time} min</span>
            </p>
            
            <p class="card-body-part-text">Body part:
               <span class="card-burned-calories-span">${bodyPart}</span>
            </p>
            <p class="card-target-text">Target:
              <span class="card-burned-calories-span">${target}</span>
            </p>

          </div>
        </li>`);
      },
      ``
    );
    //   bodyPart: 'lower legs';
    //   burnedCalories: 42;
    //   description: "Located on the back of the lower leg, the calves include the gastrocnemius and soleus muscles. They're responsible for plantar flexion (raising the heel). Calves are targeted in exercises like calf raises and during running and jumping.";
    //   equipment: 'body weight';
    //   gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/1387.gif';
    //   name: 'one leg floor calf raise';
    //   popularity: 76;
    //   rating: 4.33;
    //   target: 'calves';
    //   time: 3;
    //   _id: '64f389465ae26083f39b1af6';
    exercisesList.innerHTML = listCodeCards;
  }
  if (!arrow[0]._id) {
    let listCode = arrow.reduce(
      (list, { filter, imgUrl, name: nameMusculs }) => {
        return (list += `<li class="exercises-item" data-type="${nameMusculs}" style="background-image: linear-gradient(
      0deg,
      rgba(16, 16, 16, 0.7) 0%,
      rgba(16, 16, 16, 0.7) 100%
    ),url(${imgUrl}); ">
          <p class="exercises-item-text" data-type="${nameMusculs}">${nameMusculs}</p>
          <p class="exercises-item-text-second" data-type="${nameMusculs}">${filter}</p>
        </li>`);
      },
      ``
    );
    exercisesList.innerHTML = listCode;
  }

  if (
    !exercisesListPages.textContent ||
    typeOfFilter !==
      document.querySelector(`.exercises-pages-button`).dataset.type
  )
    addNumberOfPages();
  //   ======================================
  function addNumberOfPages() {
    let numberOfPages = ``;
    for (let i = 1; i < totalPages + 1; i++) {
      numberOfPages += `<li>
          <button class="exercises-pages-button" data-number="${i}" data-type="${typeOfFilter}">${i}</button>
        </li>`;
    }
    exercisesListPages.innerHTML = numberOfPages;
    document
      .querySelector(`.exercises-pages-button`)
      .classList.add(`select-pages-ative`);
    exercisesListPages.addEventListener(`click`, showsExercisesPages);
  }
  //   ========================================================================
}
function showsExercisesPages(e) {
  if (currentPage == e.target.dataset.number) return;
  const pageNumber = document.querySelector(`.select-pages-ative`);
  pageNumber.classList.remove(`select-pages-ative`);
  e.target.classList.add(`select-pages-ative`);
  currentPage = e.target.dataset.number;
  getExercisesFromServer(e.target.dataset.type);
}
// ==================================================================
function makeTypeOfTrainingCards(e) {
  let filter = document.querySelector(`.exercises-button-active`).dataset.name;
  if (filter === `Body parts`) filter = `Body part`;
  const filterType = e.target.dataset.type;
  currentPage = 1;
  formCard.classList;
  getCardsFromServer(filter, filterType);
}
async function getCardsFromServer(filter, filterType) {
  try {
    const answer = await searchImageOnServer(
      `exercises`,
      filter,
      currentPage,
      perPage,
      filterType
    );
    console.log(answer);
    renderExercises(answer.results, answer.totalPages);
  } catch (error) {
    console.log(error);
  }
}
// function makeTypeOfTrainingCards(e) {
//   exercisesList.removeEventListener(`click`, makeTypeOfTrainingCards);
//   const filter = document.querySelector(`.exercises-button-active`).dataset
//     .name;
//   const filterType = e.target.dataset.type;
//   currentPage = 1;
//   getCardsFromServer();

//   async function getCardsFromServer() {
//     try {
//       const answer = await searchImageOnServer(
//         `exercises`,
//         filter,
//         currentPage,
//         perPage,
//         filterType
//       );
//       console.log(answer);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
