import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
         >
        {movie.Title}
        </div>
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