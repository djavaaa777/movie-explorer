import React, { useEffect, useState } from 'react';

type typeMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

type ModalProps = {
  movie: typeMovie;
  onClose: () => void;
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function Modal({ movie, onClose }: ModalProps) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=f86b3196ea6e3a888d8bc6f3a50575ef`)
      .then(res => res.json())
      .then(data => {
        const trailer = data.results?.find(
          (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      });
  }, [movie.id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {trailerKey ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className="modal-fallback-img"
          />
        )}

        <div className="modal-info">
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
