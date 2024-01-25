import axios from 'axios';

const exercisesList = document.querySelector(`.exercises-list`);
const exercisesListPages = document.querySelector(`.exercises-list-pages`);

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
  let params = {
    page: currentPages,
    limit: perPages,
  };
  if (filterType) {
    params[filter] = filterType;
    params.keyword = keyWord;
  } else {
    params.filter = filter;
  }
  // ========================
  let parameters = new URLSearchParams(params).toString();

  try {
    const response = await axios.get(
      `https://energyflow.b.goit.study/api/${getType}?${parameters}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
// ================================================
// try {
//   const answer = searchImageOnServer(`Body parts`, 1, 8);
//   console.log(answer);
// } catch (error) {
//   console.log(error);
// }
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
  getExercisesFromServer();

  async function getExercisesFromServer() {
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
    exercisesList.addEventListener(`click`, renderTypeOfTraining);

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
    function showsExercisesPages(e) {
      if (currentPage == e.target.dataset.number) return;
      const pageNumber = document.querySelector(`.select-pages-ative`);

      pageNumber.classList.remove(`select-pages-ative`);
      e.target.classList.add(`select-pages-ative`);
      currentPage = e.target.dataset.number;
      getExercisesFromServer();
      // console.log(e.target.dataset.number);
    }
  }
  function renderTypeOfTraining(e) {
    exercisesList.removeEventListener(`click`, renderTypeOfTraining);
    const filter = document.querySelector(`.exercises-button-active`).dataset
      .name;
    const filterType = e.target.dataset.type;
    console.log(e.target.dataset.type);
  }
}

// filter: 'Muscles';
// imgUrl: 'https://ftp.goit.study/img/energy-flow/Calves.webp';
// name: 'calves';
