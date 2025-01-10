function filterMoviesByYear(movies, year) {
    // TODO: Filter the movies based on the selected year. Return an array of movies that were released after the selected year.
    let filteredMovies = movies.filter(movie => movie.releaseYear > year);
    return filteredMovies;
}

function mapMovies(movies) {
    // TODO: Map the movies to a new array of objects with only the title, genre, rating, and release year.
    let mappedMovies = movies.map(movie => ({
        title: movie.title,
        genre: movie.genre,
        rating: movie.rating,
        releaseYear: movie.releaseYear
    }));
    return mappedMovies;
}

function calculateAverageRatingByGenre(movies) {
    // TODO: Calculate the average rating for each genre. Return an array of objects with the genre and average rating for that genre.
    // Hint: Use the dictionary data structure
    const genreRatings = {};
    const genreTotals = {};

    movies.forEach(movie => {
        if (!genreRatings[movie.genre]) {
            genreRatings[movie.genre] = 0;
            genreTotals[movie.genre] = 0;
        }
        genreRatings[movie.genre] += movie.rating;
        genreTotals[movie.genre] += 1;
    });

    const genreAverages = Object.keys(genreRatings).map(genre => ({
        genre: genre,
        averageRating: genreRatings[genre] / genreTotals[genre]
    }));
    return genreAverages;
}

function joinTopMovieTitles(movies) {
    // TODO: Join the titles of the top 5 movies based on rating with a comma and space.
    const joinedTopMovies = movies.sort((a, b) => b.rating - a.rating).slice(0, 5);

    return joinedTopMovies.map(movie => movie.title).join(", ");
}

function updateBars(yearSelection) {
    // TODO: Update the visualization based on the selected year. Call the functions you created and the updateVisualization() function in d3Setup.js.

    const mappedMovies = mapMovies(moviesList);

    let filteredMovies;
    if (yearSelection === "all") {
        // TODO: Add logic to handle the case where 'all' is selected
        filteredMovies = mappedMovies;
    } else {
        const year = parseInt(yearSelection);
        // TODO: Handle the case where an actual year is selected
        filteredMovies = filterMoviesByYear(mappedMovies,year);
    }

    const genreAverages = calculateAverageRatingByGenre(filteredMovies);
    
    // TODO: Use the updateVisualizaiton function to actually update the bar chart
    let topMovieTitles = joinTopMovieTitles(filteredMovies);
    updateVisualization(genreAverages);
    
    // TODO: Get topMovieTitles using the joinTopMovieTitles function
    setTopMovies(topMovieTitles);
}