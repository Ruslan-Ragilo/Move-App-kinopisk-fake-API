//variables and filter films top

//filter films top
let totalFilms = ["TOP_250_BEST_FILMS&page=1", "TOP_100_POPULAR_FILMS&page=1"];

const itemFilterFilms = document.querySelectorAll(".item_filter_films");

let totalNumberPagination;

for (let itemFilterFilm of itemFilterFilms) {
  if (itemFilterFilm.checked) {
    totalNumberPagination = Number(itemFilterFilm.value);
  }
}

let API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${totalFilms[0]}`;

(wrpapperFilms = document.querySelector(".wrpapper_films")),
  (headerSearch = document.querySelector(".header__search")),
  (pagination = document.querySelector(".pagination"));

let filmsEl;
let responseFilms;
let responseKey;

const apiKeyURL = "http://localhost:3000/key";

//fuction show box film
const showBoxFilm = (movie) => {
  filmsEl = document.createElement("div");
  filmsEl.classList.add("movie");
  filmsEl.innerHTML = `
  <div class="wrapper_film">
      <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${
    movie.nameRu
  }">
          <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__average movie__average--green">${
            movie.rating !== null ? String(movie.rating.substring(0, 1)) : 7
          }</div>
      </div>
  <div/>`;
  wrpapperFilms.appendChild(filmsEl);
};



//fetch request
const fetchMovies = async (url, key) => {
  const getDataFilm = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": key,
    },
  });
  const jsonResponse = await getDataFilm.json();
  responseFilms = await jsonResponse.films;
  showMovies(responseFilms);
};

//get API Key and call function fetchMovies
const getMovies = async (apiKeyURL) => {
  const getDataKey = await fetch(apiKeyURL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await getDataKey.json();
  responseKey = await jsonResponse[0].API_KEY;
  fetchMovies(API_URL, responseKey);
};



getMovies(apiKeyURL);

//function for show films
const showMovies = (data) => {
  data.forEach((movie) => {
    showBoxFilm(movie);
  });
};

//add pagination number
var numberPaginations;
const addPaginationNumber = (totalNumberPagination) => {
  for (let i = 1; i <= totalNumberPagination / 20; i++) {
    pagination.innerHTML += `<p class="number_pagination ${
      i == 1 ? " active" : +""
    }">${i}</p>`;
  }
  numberPaginations = document.querySelectorAll(".number_pagination");
};

addPaginationNumber(totalNumberPagination);

//function for pagination
let paginations = () => {for (let numberPagination of numberPaginations) {
  numberPagination.addEventListener("click", (e) => {
    for (let numberPagination of numberPaginations) {
      numberPagination.classList.remove("active");
    }
    if (e.target === numberPagination) {
      e.target.classList.add("active");
      wrpapperFilms.innerHTML = "";
      fetchMovies(
        API_URL.substring(0, API_URL.length - 1) + e.target.textContent,
        responseKey
      );
    }
  });
}}

paginations();


//function filter movies popular
itemFilterFilms.forEach((itemFilterFilm, index) => {
  itemFilterFilm.addEventListener("change", (e) => {
    wrpapperFilms.innerHTML = "";
    filmFilter = totalFilms[index];
    fetchMovies(API_URL.substring(0, 60) + filmFilter, responseKey);
    totalNumberPagination = Number(e.target.value);
    pagination.innerHTML = "";
    addPaginationNumber(totalNumberPagination);
    paginations();
  });
});



//function for search
headerSearch.addEventListener("input", (e) => {
  e.target.value.length > 0
    ? (pagination.style.visibility = "hidden")
    : (pagination.style.visibility = "visible");
  wrpapperFilms.innerHTML = "";
  responseFilms.filter((movie, i) => {
    if (movie.nameRu.toLowerCase().indexOf(e.target.value.toLowerCase()) + 1) {
      showBoxFilm(movie);
    }
  });
});
