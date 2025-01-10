// **** Your JavaScript code goes here ****

const movieList = [
    {
        title: "The Maze Runner",
        director: "Wes Ball",
        releaseYear: 2014,
        genre: "Dystopian Science Fiction",
        rating: 7.2,
        boxOffice: 348.3
    },
    {
        title: "Maze Runner: The Scorch Trials",
        director: "Wes Ball",
        releaseYear: 2015,
        genre: "Dystopian Science Fiction",
        rating: 6.3,
        boxOffice: 312.2
    },
    {
        title: "Maze Runner: The Death Cure",
        director: "Wes Ball",
        releaseYear: 2018,
        genre: "Dystopian Science Fiction",
        rating: 6.3,
        boxOffice: 288.1
    }
];

// Copy and paste your data structure from the previous activity

function adjustRating(movie, adjustment) {
    // TODO: Return the new rating for movie adjusted by adjustment

    let newRating = movie.rating + adjustment;

    if (newRating > 10) {
        newRating = 10;
    } else if (newRating < 0) {
        newRating = 0;
    }

    return newRating;
}

function debugMovies(movies) {
    // TODO: Loop through the movies list and log their title and new rating
    movies.forEach(movie => {
        console.log(`Title: ${movie.title}, Rating: ${movie.rating}`);
    });
}

function calculateAverageRating(movies) {
    // TODO: Calculate average rating of movies
    let averageRating = 0;

    movies.forEach(movie => {
        averageRating += movie.rating
    });

    return averageRating / movies.length;
}

function findHighestGrossing(movies) {
    // TODO: Find highest grossing movie's title

    let highestGrossingTitle = movies[0];

    movies.forEach(movie => {
        if (movie.boxOffice > highestGrossingTitle.boxOffice) {
            highestGrossingTitle = movie;
        }
    });

    return highestGrossingTitle.title;
}


// Changing the DOM with JavaScript

// Starter Code
var main = document.getElementById("main");
var header = document.createElement("h1");
main.appendChild(header);
header.textContent = "Movies Information";
var div1 = document.createElement("div");
div1.setAttribute("id", "movie-container");
main.appendChild(div1);

function displayMovieCount(movies) {
    // TODO: Display movie count as specified in the readMe
    const movieCountElement = document.createElement("h2");
    movieCountElement.textContent = `Total Movies: ${movies.length}`;
    document.getElementById("movie-container").appendChild(movieCountElement);
}

function createMovieCards(movies) {
    // TODO: Create movie card for each movie in movies
    const movieContainer = document.getElementById("movie-container");

    movies.forEach(movie => {
        const movieCard = document.createElement("div");

        const titleElement = document.createElement("h3");
        titleElement.textContent = movie.title;
        movieCard.appendChild(titleElement);

        const directorElement = document.createElement("p");
        directorElement.textContent = `Director: ${movie.director}`;
        movieCard.appendChild(directorElement);

        const releaseYearElement = document.createElement("p");
        releaseYearElement.textContent = `Release Year: ${movie.releaseYear}`;
        movieCard.appendChild(releaseYearElement);

        const genreElement = document.createElement("p");
        genreElement.textContent = `Genre: ${movie.genre}`;
        movieCard.appendChild(genreElement);

        const ratingElement = document.createElement("p");
        ratingElement.textContent = `Rating: ${movie.rating}`;
        movieCard.appendChild(ratingElement);

        const boxOfficeElement = document.createElement("p");
        boxOfficeElement.textContent = `Box Office: ${movie.boxOffice}`;
        movieCard.appendChild(boxOfficeElement);
        
        movieContainer.appendChild(movieCard);
    });
}

// Extra Credit
function highlightHighlyRated(minRating) {
    // TODO: highlight highly rated movie cards
    const movieCards = document.querySelectorAll("#movie-container > div");

    movieCards.forEach(card => {
        const ratingText = card.querySelector("p:nth-child(5)").textContent;
        const rating = parseFloat(ratingText.split(": ")[1]);

        if (rating >= minRating) {
            card.classList.add("highly-rated");
        }
    });
}

// Main function
function initializeMoviePage(movies) {
    // TODO: Call the above functions in the correct order to set up your movie page
    displayMovieCount(movies);

    createMovieCards(movies);

    highlightHighlyRated(7);

    debugMovies(movies);

    console.log(`Average Rating: ${calculateAverageRating(movies)}`);
    console.log(`Highest Grossing Movie: ${findHighestGrossing(movies)}`);
}

initializeMoviePage(movieList);
