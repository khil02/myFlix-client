import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/provile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [ movies, setMovies ] = useState([]);
    const [ user, setUser ] = useState(storedUser? storedUser : null);
    const [ token, setToken ] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if (!token) return;


        fetch("https://my-flix882023-9b8843449882.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
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
    }, [token]);


    return ( 
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>This list is empty!</Col>
                                ) : (
                                    <Col>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to ="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>This list is empty!</Col> 
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie._id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>This list is empty!</Col>
                                ) : (
                                    <Col>
                                        <ProfileView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
//             {!user ? (
//                 // Checks if user is logged in
//             < Col md={5}>
//                 <LoginView 
//                 onLoggedIn={(user, token) => {
//                 setUser(user);
//                 setToken(token);
//                 }} />
//             <hr/>
//             or
//                 <SignupView />
//                 </Col>
//             ) : selectedMovie ? (
//                 <Col md={8}>
//                     <MovieView
//                     style={{ border: "1px solid green"}}
//                     movie={selectedMovie} 
//                     onBackClick={() => setSelectedMovie(null)} 
//                     />
//                 </Col>
//             ) : movies.length === 0 ? (
//                 <div>This list is empty!</div>
//             ) : (
//                 <>
//                 <div>
//                     <Button
//                         onClick={() => {
//                         setUser(null);
//                         setToken(null);
//                         localStorage.clear();
//                         }}
//                         >
//                         Logout
//                     </Button>
//                 </div>

//                 {movies.map((movie) => (
//                     <Col className="mb-5" key={movie._id} md={3}>
//                         <MovieCard
//                         movie={movie}
//                         onMovieClick={(newSelectedMovie) => {
//                         setSelectedMovie(newSelectedMovie);
//                         }}
//                         />
//                     </Col>
//                 ))}
//              </>
//             )}
//         </Row>
//     ); 
// }; 
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
