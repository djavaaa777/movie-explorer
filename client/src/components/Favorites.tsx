import Movie from "./Movie";

type typeMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

type FavoritesProps = {
  favorites: typeMovie[];
  onSelect: (movie: typeMovie) => void;
  onAdd: (movie: typeMovie) => void;
};

function Favorites({ favorites, onSelect, onAdd }: FavoritesProps) {
    return (
      <div className="movies">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              onSelect={onSelect}
              onAdd={onAdd}
              isFavorite={true}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "white", fontSize: "1.2rem" }}>
            You don't have any favorite movies yet.
          </p>
        )}
      </div>
    );
  }
  

export default Favorites;
