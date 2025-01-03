import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { popup, setPopup } = useMovieContext();

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      {popup && (
        <div className="popup slide-in-fwd-top" onClick={clearPopup}>
          {popup}
          <span className="close">❌</span>
        </div>
      )}
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
