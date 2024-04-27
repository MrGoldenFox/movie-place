const searchBtn = document.getElementById("search-btn");
const moviesList = document.getElementById("movies-container");
const inputEl = document.getElementById("input-element");
const apiKey = "d7a94a0c";
let currentList;

document.addEventListener("click", (e) => {
  if(e.target.dataset.addwatchlist){
    let storedIDs = getStoriesIds();

    if(!storedIDs.includes(e.target.dataset.addwatchlist)){
      storedIDs.push(e.target.dataset.addwatchlist)

      localStorage.setItem("StoredIDs", JSON.stringify(storedIDs));
    }
  }
})

searchBtn.addEventListener("click", () => {
  if (!inputEl.value) {
    return;
  }

  currentList = "";

  document.getElementById("find-movie").style.display = "none";

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${inputEl.value}`)
    .then((response) => response.json())
    .then((data) => {
      data.Search.forEach((movie) => {
        const imdbID = movie.imdbID;
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
          .then((response) => response.json())
          .then((movie) => {
            currentList += `
            <figure>
                    <img src="${movie.Poster}" alt="${
              movie.Title
            }" class="movie-picture">
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
                    <button class="plus-btn" data-addwatchlist="${imdbID}"><img src="./img/plus.png" alt="rating of movie" class="star">Watchlist</button><br>
                    </article>
                    <article>
                    <h6>${movie.Plot}</h6> 
                    </article>
                    </div>
                    </figure>
                    `;
            moviesList.innerHTML = currentList;
          });
      });
    });
    if (!currentList){
      moviesList.innerHTML = `<h3>Unable to find what you’re looking for. Please try another search.
      </h3>`
    }
});

const getStoriesIds = () => {
  return JSON.parse(localStorage.getItem("StoredIDs")) || [];
}
