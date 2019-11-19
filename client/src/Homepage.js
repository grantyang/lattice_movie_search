import React, { useState } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import useMovieSearch from './useMovieSearch';

export default function Homepage() {
  const [query, setQuery] = useState('');
  const {movies, loading, error} = useMovieSearch(query);
  return (
    <>
      <SearchBar setQuery={setQuery} query={query} />
      <MovieList movies={movies} loading={loading} error={error} />
    </>
  )
}