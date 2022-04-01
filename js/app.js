//variables
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
  wrpapperFilms = document.querySelector(".wrpapper_films"),
  headerSearch = document.querySelector(".header__search"),
  pagination = document.querySelector(".pagination");

let filmsEl;
let responseFilms;
let responseKey;

const apiKey = "http://localhost:3000/key";

//fuction show box film

const showBoxFilm = (movie) => {
  filmsEl = document.createElement("div");
  filmsEl.classList.add("movie");
  filmsEl.innerHTML = `
  <div class="wrapper_film">
      <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}">
          <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__average movie__average--green">${movie.rating.slice(0,1)}</div>
      </div>
  <div/>`;
  wrpapperFilms.appendChild(filmsEl);
};

//fetch request

const getMuvies = async (url, key) => {
  const getDataFilm = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": key,
    },
  });
  const jsonResponse = await getDataFilm.json();
  responseFilms = await jsonResponse.films;
  showMuvies(responseFilms);
};

//get API Key

const getAPIKey = async (apiKey) => {
  const getDataKey = await fetch(apiKey, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await getDataKey.json();
  responseKey = await jsonResponse[0].API_KEY;

  getMuvies(API_URL_POPULAR, responseKey);
};

getAPIKey(apiKey);

//function for show films

const showMuvies = (data) => {
  data.forEach((movie) => {
    showBoxFilm(movie);
  });
};

//add pagination Number

const addPaginationNumber = () => {
  for (let i = 1; i <= 10; i++) {
    if (i == 1) {
      pagination.innerHTML += `
      <p class="number_pagination active">${i}</p>
    `;
    } else {
      pagination.innerHTML += `
      <p class="number_pagination">${i}</p>
    `;
    }
  }
};

addPaginationNumber();

//fuction for pagination

pagination.addEventListener("click", (e) => {
  const numberPaginations = document.querySelectorAll(".number_pagination");
  for (let numberPagination of numberPaginations) {
    numberPagination.classList.remove("active");
    if (e.target === numberPagination) {
      e.target.classList.add("active");
      wrpapperFilms.innerHTML = "";
      getMuvies(
        API_URL_POPULAR.substring(0, API_URL_POPULAR.length - 1) +
          e.target.textContent,
        responseKey
      );
    }
  }
});

//function for search

headerSearch.addEventListener("input", (e) => {
  if (e.target.value.length > 0) {
    pagination.style.visibility = "hidden";
    wrpapperFilms.innerHTML = "";
    responseFilms.filter((movie, i) => {
      if (
        movie.nameRu.toLowerCase().indexOf(e.target.value.toLowerCase()) + 1
      ) {
        showBoxFilm(movie);
      }
    });
  } else {
    pagination.style.visibility = "visible";
    wrpapperFilms.innerHTML = "";
    responseFilms.filter((movie, i) => {
      if (
        movie.nameRu.toLowerCase().indexOf(e.target.value.toLowerCase()) + 1
      ) {
        showBoxFilm(movie);
      }
    });
  }
});