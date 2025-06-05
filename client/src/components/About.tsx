import React from 'react';
import { FaFilm, FaStar, FaSearch, FaHeart } from 'react-icons/fa';

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">
        <FaFilm /> Discover Your Next Favorite Movie
      </h1>

      <p className="about-text">
        Welcome to <strong>Movie Explorer</strong> — your personal gateway to the world of cinema. 🎬
      </p>

      <p className="about-text">
        Tired of endlessly scrolling through movie lists? With Movie Explorer, you can <FaSearch /> easily search,
        <FaStar /> discover hidden gems, and <FaHeart /> save your favorites all in one place.
      </p>

      <p className="about-text">
        Whether you're planning a movie night, tracking your favorite films, or just browsing trailers — this app is designed to make your movie journey smooth, fast, and fun.
      </p>

      <p className="about-text">
        All trailers, posters, and details are updated live, so you never miss what's hot or classic.
      </p>

      <p className="about-quote">
        Lights. Camera. Explore! 🍿
      </p>

      <p className="about-signature">Enjoy the show — your next favorite film is just a click away.</p>
    </div>
  );
}

export default About;
