import { useEffect ,useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('https://my-flix882023-9b8843449882.herokuapp.com/movies')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const moviesFromApi = data.map((doc) => {
                return {
                    _id: doc._id,
                    Title: doc.Title,
                    ImagePath: doc.ImagePath,
                    Description: doc.Description,

                    Director: doc.Director,

                    Genre: doc.Genre,
                    //Actors: doc.Actors,
                    Featured: doc.Featured
                };
            });
            setMovies(moviesFromApi);
        });
    }, []);
    
// if a movie is selected, displays the Movie-view component
        if (selectedMovie) {
            let similarMovies = movies.filter((movie) => {
                return movie._id !== selectedMovie._id && movie.Genre.Name == selectedMovie.Genre.Name;
            });
            return (
            <>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                
                {/* Adds similar movie list */}
                <hr />
                <h2>Similar Movies: </h2>
                {similarMovies.map((movie) => (
                <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
            </>
            );
        }

        if (movies.length === 0) {
            return <div>This list is empty!</div>;
        }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};