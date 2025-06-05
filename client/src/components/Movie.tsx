import { MdFavorite,MdFavoriteBorder } from "react-icons/md";

type typeMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

type MovieProps  = {
  movie: typeMovie;
  onSelect:(movie:typeMovie)=>void
  onAdd:(movie:typeMovie)=>void
  isFavorite: boolean;
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function Movie({movie,onSelect,onAdd,isFavorite}:MovieProps) {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={movie.title}
        onClick={()=>onSelect(movie)}
      />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-date">{movie.release_date}</p>
        <p className="movie-overview">{movie.overview.slice(0, 120)}...</p>
        {isFavorite ? (
          <MdFavorite
            className="add-to-favorite-btn"
            style={{ color: 'gold' }}
            onClick={() => {
              onAdd(movie)
            }}
            
          />
        ) : (
          <MdFavoriteBorder
            className="add-to-favorite-btn"
            onClick={() => {
              onAdd(movie)
            }}
          />
        )}
        </div>
    </div>
  )
}

export default Movie