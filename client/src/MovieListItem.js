import React from 'react'
import { Link } from 'react-router-dom';

export default function MovieListItem({movie, setCurrentId = ()=>{}}) {
  const { id, original_title } = movie;
  return (
    <div className='movie-item'>
      <Link to={`/movie/${id}`} onClick={setCurrentId.bind(this, id)}>{original_title}</Link>
    </div>
  )
}
