// import { useParams } from "react-router";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import { MovieCard } from "../movie-card/movie-card";

// export const similarMovies = (movies) => {

//     const { movieId } = useParams();
//     const selectedMovie = movies.find((m) => m._id === movieId);

//     let simMovies = movies.filter((movie) => {
//         return movie._id !== selectedMovie._id && movie.Genre.Name == selectedMovie.Genre.Name;
//     });
//     return {
//     simMovies.map((movie) => (
//             <Col className="mb-5" key={movie._id} md={3}>
//                 <MovieCard movie={movie} />
//             </Col>
//         ))
//     }
// }


//// Legacy 
// if a movie is selected, displays the Movie-view component
        // if (selectedMovie) {
        //     let similarMovies = movies.filter((movie) => {
        //         return movie._id !== selectedMovie._id && movie.Genre.Name == selectedMovie.Genre.Name;
        //     });
        //     return (
        //     <>
        //         <MovieView
        //         style={{ border: "1px solid green"}}
        //          movie={selectedMovie} 
        //          onBackClick={() => setSelectedMovie(null)} 
        //          />
                
        //         {/* Adds similar movie list */}
        //         <hr />
        //         <h2>Similar Movies: </h2>
        //         {similarMovies.map((movie) => (
        //         <MovieCard
        //         key={movie._id}
        //         movie={movie}
        //         onMovieClick={(newSelectedMovie) => {
        //             setSelectedMovie(newSelectedMovie);
        //         }}
        //         />
        //     ))}
        //     </>
        //     );
        // }

