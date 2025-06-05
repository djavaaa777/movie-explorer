import Movie from "./Movie"

type typeMovie = {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    overview: string;
  };
  
  type MoviesProps  = {
    movies: typeMovie[];
    onSelect:(movie:typeMovie)=>void
    onAdd:(movie:typeMovie)=>void
    favorites: typeMovie[];
  };

function Movies(props: MoviesProps) {
  return (
    <div className="movies">
        {props.movies.filter(movie => movie.poster_path).map(movie=>
            <Movie key={movie.id} movie={movie} onSelect={props.onSelect} onAdd={props.onAdd} isFavorite={props.favorites.some((fav) => fav.id === movie.id)}/>
        )}
    </div>
  )
}

export default Movies