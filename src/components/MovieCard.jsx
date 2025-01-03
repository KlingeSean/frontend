import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const favorite = isFavorite(movie.id);
  const onFavouriteClick = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    const span = button.querySelector("span");

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }

    // Add animation to the span element
    if (span) {
      button.disabled = true;
      span.classList.add("animate");
      setTimeout(() => {
        span.classList.remove("animate");
        button.disabled = false;
      }, 500);
    }
  };

  const average = Math.round(movie.vote_average * 10);

  const getScoreColor = (score) => {
    if (score >= 70) return "#21d07a"; // Green
    if (score >= 50) return "#d2d531"; // Orange
    return "#db2360"; // Red
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn${favorite ? " active" : ""}`}
            onClick={onFavouriteClick}
          >
            <span>♥</span>
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="score-container">
          <div className="score-circle">
            <CircularProgressbar
              value={average}
              text={`${average}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: getScoreColor(average),
                trailColor: "#444",
              })}
            />
          </div>
          <p>User score</p>
        </div>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;
