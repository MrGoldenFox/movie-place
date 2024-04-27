let storageFilms = JSON.parse(localStorage.getItem("StoredIDs")) || [];
const searchBtn = document.getElementById("search-btn");
const moviesList = document.getElementById("movies-container");
const findMoviesElements = document.getElementsByClassName("find-movie");
const apiKey = "d7a94a0c";
let currentList;

function checkMovieList(){
  console.log(storageFilms.length)
  if (storageFilms.length === 0) {
    for (let i = 0; i < findMoviesElements.length; i++) {
      findMoviesElements[i].style.display = "block";
    }
  }
  else {
    for (let i = 0; i < findMoviesElements.length; i++) {
      findMoviesElements[i].style.display = "none";
    }
  }
}


document.addEventListener("click", (e) => {
   if (e.target.dataset.removewatchlist) {
    moviesList.innerHTML = ''
    const selectedIdForRemove = e.target.dataset.removewatchlist;


    storageFilms = storageFilms.filter((item) => item !== selectedIdForRemove);
    localStorage.removeItem("StoredIDs")
    localStorage.setItem("StoredIDs" , JSON.stringify(storageFilms))
    console.log(storageFilms);
    renderMovies();
    checkMovieList();
  }
});

function renderMovies() {
  currentList = "";

  for (let i = 0; i < storageFilms.length; i++)
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${storageFilms[i]}`)
      .then((res) => res.json())
      .then((movie) => {
        currentList += `
<figure>
        <img src="${movie.Poster}" alt="${movie.Title}" class="movie-picture">
        <div>
        <article>
        <h2>${movie.Title}</h2>
        <p><img src="${"./img/star.png"}" alt="rating of movie" class="star"> ${
          movie.Ratings[0].Value
        }</p><br>
        </article>
        <article>
        <h5>${movie.Runtime}</h5>
        <h5>${movie.Genre}</h5>
        <button class="minus-btn" data-removewatchlist=${
          movie.imdbID
        }><img src="./img/minus.png" alt="rating of movie" class="star" >Remove</button><br>
        </article>
        <article>
        <h6>${movie.Plot}</h6> 
        </article>
        </div>
        </figure>
        `;
        moviesList.innerHTML = currentList;
      });
}

renderMovies();
checkMovieList();