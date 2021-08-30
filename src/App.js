// Стили
import './../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css';

// Библиотеки
import React, {useState, useEffect, useRef} from 'react'
import {NavLink, Route} from 'react-router-dom'

// Компоненты (Сторонние и пользовательские)
import {Navbar, Form} from 'react-bootstrap'
import MovieList from './components/MovieList'
import MoviePage from './components/MoviePage'

export const MoviesContext = React.createContext();

export const API = {
  key: 'e530068288bf6a8d2ac483dd6962dca3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
  getAPIUrlForMovieListSearchedByQuery(query) {
    return `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&page=1&query=${query}`
  },
  getAPIUrlForTrendingDataByType(type = 'movie') {
    return `https://api.themoviedb.org/3/trending/${type}/day?api_key=${this.key}`
  },
  getAPIUrlForMovieImages(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${this.key}`
  },
  getAPIUrlForAllGenres() {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`
  },
  getAPIUrlForMovieId(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.key}`
  },
  getAPIUrlForListOfFilms(listIndex, page = 1) {
    return `https://api.themoviedb.org/4/list/${listIndex}?page=${page}&api_key=${this.key}`
  },
}

function App() {

  // Состояние списка фильмов
  const [movies, setMovies] = useState({});
  
  // Ссылка на input
  const inputRef = useRef();

  // Получение списка фильмов при "старте" страницы
  useEffect(() => {
    fetch(API.getAPIUrlForTrendingDataByType())
      .then(res => res.json())
      .then(res => setMovies(res))
  }, []);

  // Заменяем список фильмов на список, найденный по подстроке (query)
  function setMoviesBySearchingByQuery(query) {
    if (query === '') {
      fetch(API.getAPIUrlForTrendingDataByType())
        .then(res => res.json())
        .then(res => setMovies(res));
    } else {
      fetch(API.getAPIUrlForMovieListSearchedByQuery(query))
        .then(res => res.json())
        .then(res => setMovies(res));
    }
  }

  // Заменяем список фильмов на список популярных фильмов
  function setMoviesByTrending() {
    fetch(API.getAPIUrlForTrendingDataByType())
      .then(res => res.json())
      .then(res => setMovies(res));
    inputRef.current.value = '';
  }

  return (
    <div className="App">
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand as={NavLink} to='/' variant='dark' onClick={setMoviesByTrending}>My Project</Navbar.Brand>
        <Form inline className='ml-auto'>
          <Form.Control ref={inputRef} placeholder='Search film...' 
          onChange={() => setMoviesBySearchingByQuery(inputRef.current.value)} 
          />
        </Form>
      </Navbar>

      <MoviesContext.Provider value={movies}>
        <Route exact component={MovieList} path='/' />
        <Route exact component={MoviePage} path='/film/:id' />
      </MoviesContext.Provider>
    </div>
  );
}

export default App;
