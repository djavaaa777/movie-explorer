import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Movies from './components/Movies';
import Modal from './components/Modal';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';

export type typeMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

type typeAppState = {
  movies: typeMovie[];
  searchTerm: string;
  selectedMovie: boolean;
  currentItem: typeMovie | null;
  favorites: typeMovie[];
  isLogged: boolean;
};

export default class App extends Component<{}, typeAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      movies: [],
      searchTerm: '',
      selectedMovie: false,
      currentItem: null,
      favorites: [],
      isLogged: false,
    };

    this.searchItem = this.searchItem.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.loadFavoritesFromServer = this.loadFavoritesFromServer.bind(this);
  }

  componentDidMount(): void {
    this.fetchMovies('');
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isLogged: true }, this.loadFavoritesFromServer);
    }
  }

  handleLoginSuccess() {
    this.setState({ isLogged: true }, this.loadFavoritesFromServer);
  }

  searchItem(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value.trim();
    this.setState({ searchTerm: query });
    this.fetchMovies(query);
  }

  selectMovie(movie: typeMovie) {
    this.setState({
      selectedMovie: true,
      currentItem: movie,
    });
  }

  async addToFavorite(movie: typeMovie) {
    if (!this.state.isLogged) {
      alert("Please log in to add to favorites.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const isInFavorites = this.state.favorites.some(el => el.id === movie.id);

      const options: RequestInit = {
        method: isInFavorites ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (!isInFavorites) {
        options.body = JSON.stringify(movie);
      }

      const res = await fetch(
        isInFavorites
          ? `http://localhost:5000/api/favorites/${movie.id}`
          : `http://localhost:5000/api/favorites`,
        options
      );

      if (res.ok) {
        console.log("✅ Ответ от сервера OK — вызываем loadFavoritesFromServer()");
        await this.loadFavoritesFromServer();
      } else {
        const err = await res.json();
        console.error("❌ Server error:", err.message);
      }
    } catch (error) {
      console.error("❌ Request failed:", error);
    }
  }

  async loadFavoritesFromServer() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const favorites = await res.json();
        console.log("📦 Загруженные избранные фильмы:", favorites);
        this.setState({ favorites });
      }
    } catch (err) {
      console.error('❌ Error loading favorites:', err);
    }
  }

  fetchMovies(query: string) {
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=f86b3196ea6e3a888d8bc6f3a50575ef&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`
      : `https://api.themoviedb.org/3/movie/popular?api_key=f86b3196ea6e3a888d8bc6f3a50575ef&language=en-US&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          this.setState({ movies: data.results });
        } else {
          this.setState({ movies: [] });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            onSearch={this.searchItem}
            onLoginSuccess={this.handleLoginSuccess}
            isLogged={this.state.isLogged}
            onLogout={() => this.setState({ isLogged: false })}
          />
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <Movies
                    movies={this.state.movies}
                    onSelect={this.selectMovie}
                    onAdd={this.addToFavorite}
                    favorites={this.state.favorites}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    favorites={this.state.favorites}
                    onSelect={this.selectMovie}
                    onAdd={this.addToFavorite}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register onLoginSuccess={this.handleLoginSuccess} />} />
              <Route path="/login" element={<Login onLoginSuccess={this.handleLoginSuccess} />} />
            </Routes>
            {this.state.selectedMovie && this.state.currentItem && (
              <Modal
                movie={this.state.currentItem}
                onClose={() => this.setState({ selectedMovie: false })}
              />
            )}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
