import React from 'react'
import MovieListItem from './MovieListItem'

export default function MovieList({movies = [], loading, error}) {
  return (
    <div id='movie-list'>
      <div className={loading ? 'loading' : 'hidden'}>Loading movies...</div>
      {error && <div>There's been an error, please try again.</div>}
      {movies.length ? movies.map(movie => {
        return <MovieListItem key={movie.id} movie={movie} />
      }) : null }
    </div>
  )
}
