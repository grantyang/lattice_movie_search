import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useMovieSearch(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  // On initial load, show popular movies
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios.get(`http://localhost:3001/movies/popular`)
    .then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      setError(true);
    })
  }, []);

  // When query is changed, search
  useEffect(() => {
    if (query.length === 0) {
      setLoading(false);
      setError(false);
      setMovies([]);
    } else {
      setLoading(true);
      setError(false);
      axios.get(`http://localhost:3001/movies/search/${query}`)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      })
    }
  }, [query])

  return {loading, error, movies};
}
