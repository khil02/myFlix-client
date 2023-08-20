import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Top Gun",
            image: "https://upload.wikimedia.org/wikipedia/en/4/46/Top_Gun_Movie.jpg",
            director: "Tony Scott",
            genre: "Action",
            description: "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom."
        },
        {
            id: 2,
            title: "Dune",
            image: "https://upload.wikimedia.org/wikipedia/en/5/51/Dune_1984_Poster.jpg",
            director: "David Lynch",
            genre: "Sci-fi",
            description: "A Duke's son leads desert warriors against the galactic emperor and his father's evil nemesis to free their desert world from the emperor's rule."
        },
        {
            id: 3,
            title: "Barbie",
            image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
            director: "Greta Gerwig",
            genre: "Comedy",
            description: "Barbie suffers a crisis that leads her to question her world and her existence."
        }
    ]);
        const [selectedMovie, setSelectedMovie] = useState(null);

        if (selectedMovie) {
            return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
        }

        if (movies.length === 0) {
            return <div>This list is empty!</div>;
        }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};