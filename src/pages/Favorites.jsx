import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
const Favorites = () => {
  const { favorites, popup, setPopup } = useMovieContext();
  const clearPopup = () => {
    setPopup(null);
  };

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        clearPopup(); // Clear the popup after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer if popup changes
    }
  }, [popup]);

  if (favorites.length > 0) {
    return (
      <>
        {popup && (
          <div className="popup" onClick={clearPopup}>
            {popup}
            <span className="close">❌</span>
          </div>
        )}
        <div className="favorites">
          <h2>Your favorites</h2>
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {popup && <div className="popup">{popup}</div>}
      <div className="favorites-empty">
        <h2>No favorite movies yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    </>
  );
};

export default Favorites;
