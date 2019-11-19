import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import MovieListItem from './MovieListItem';

export default function MovieDetail(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState({results:[]});
  const [currentId, setCurrentId] = useState(useParams().id);

  // Scroll to top of page in case of related title clicked
  window.scrollTo(0, 0);

  // When currentId is changed because a new movie was clicked, fetch new movie data
  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${currentId}`)
    .then((response) => {
      setMovie(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      setError(true);
    })
  }, [currentId]);

  const { poster_path, original_title, release_date, vote_average, genres, overview, cast } = movie;
  const related = movie.results;

  return (
    <div id='movie-detail'>
      <Link to={`/`}>Return to Search</Link>
      {loading && <div className='loading'>Loading movies...</div>}
      {error && <div>There's been an error, please try again.</div>}
      {movie && movie.id && 
      <div> 
        <img className='detail-poster' alt='poster' src={`http://image.tmdb.org/t/p/w300_and_h450_bestv2/${poster_path}`}/>
        <div className='detail-title'>{original_title}</div>
        <div className='detail-release-date'>Released on: {moment(release_date).format("MMM Do YYYY")}</div>
        <div className='detail-score'>Viewer Rating: {vote_average}</div>
        <div className='detail-genres'>Genres: {genres.map(mov=>mov.name).join(', ')}</div>
        <div className='detail-overview'>{overview}</div>
        <div className='detail-cast'>Cast:{cast.map(c => {
          return <div key={c.cast_id}>{c.character}: {c.name}</div>
        })}
        </div>
        { related.length ? 
        <div className='detail-related'>Related Titles:{related.map(relMovie => {
          return <MovieListItem key={relMovie.id} movie={relMovie} setCurrentId={setCurrentId}/>
          })}
        </div> : null }
      </div>
      }
    </div>
  )
}
