import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)} variant="link">
            <Card.Img variant="top" src={movie.ImagePath} alt="movie poster" />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Body>
                    {/* Slice limits Description text */}
                    <Card.Text>{movie.Description.slice(0,150)}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Genre: {movie.Genre.Name} </Card.Footer>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,

            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Bio: PropTypes.string.isRequired,
                // birth string is probably incorrect
                Birth: PropTypes.string.isRequired
            }).isRequired,

            Genre: PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Description: PropTypes.string.isRequired,
            }).isRequired,
            //Actors: PropTypes.shape({ }),
            
            Featured: PropTypes.bool.isRequired
            
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};