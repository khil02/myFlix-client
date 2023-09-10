import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [ user, setUser ] = useState(storedUser? storedUser : null);
    const [ token ] = useState(storedToken? storedToken : null);
    const [username] = useState(user.Username);
    const movie = movies.find((m) => m._id === movieId);
    const [ isFavorite, setisFavorite ] = useState(false);

    useEffect(() => {
        if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)){
            setisFavorite(true);
        }
    }, []);

    const addToFavorite = () => {
        fetch(`https://my-flix882023-9b8843449882.herokuapp.com/users/${encodeURIComponent(username)}/favorites/${movie._id}`, {
            method: "Post",
            headers: {"Content-Type": "application/json", 
            Authorization: `Bearer ${token}` }
        })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed to add to favorites");
        }
        }).then((res) => {
            setisFavorite(true);
            setUser(res);
            localStorage.setItem("user", JSON.stringify(res));
            alert("Movie added to favorites");
        });
    }
    const removeFromFavorite = () => {
        fetch(`https://my-flix882023-9b8843449882.herokuapp.com/users/${encodeURIComponent(username)}/favorites/${movie._id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", 
            Authorization: `Bearer ${token}` }
        })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed to remove from favorites");
        }
        }).then((res) => {
            setisFavorite(false);
            setUser(res);
            localStorage.setItem("user", JSON.stringify(res));
            alert("Movie removed from favorites");
        });
    }

    return (
        <div>
            <div>
                <img className="w-50"src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                {!isFavorite ? (
                <Button variant="secondary" onClick={addToFavorite}>Add to Favorite</Button>
                ) : (
                <Button variant="secondary" onClick={removeFromFavorite}>Remove from Favorite</Button>
                )}
            </div>
            <Link to={'/'}>
                <Button variant="primary">Back</Button>
            </Link>
        </div>
    );
};