import React, { useState, useEffect } from "react";
import './app.scss';
import { Header } from '../header';
import { MovieSlider } from '../movie-slider';
import { MovieApiService } from '../../api';

export const App = () => {

  const movieApi = new MovieApiService();
  const [movieArr, setMovieArr] = useState([]);
  const [movieRatedArr, setMovieRatedArr] = useState([]);
  const [genresObj, setGenresObj] = useState({});
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const newGenresObj = await movieApi.getGenres();
      setGenresObj(newGenresObj);
    };
    fetchGenres();
    fetchRatedFilms();
    console.log(movieRatedArr)
  }, []);


  const fetchRatedFilms = async () => {
    const newRatedArr = await movieApi.getRatedFilms();
    setMovieRatedArr(newRatedArr)
  };

  const createFilms = (str) => {
    movieApi.getFilms(str).then((response) => {
      setMovieArr(response.results)
    });
  }

  const createImg = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original';
    return `${baseUrl}${path}`
  }

  return (
    <div className="app container" >
      <Header
        createFilms={createFilms}
        isRated={isRated}
        setIsRated={setIsRated} >
      </Header>
      <MovieSlider
        movieArr={movieArr}
        createImg={createImg}
        genresObj={genresObj}
        isRated={isRated}
        movieRatedArr={movieRatedArr}
        setMovieRatedArr={setMovieRatedArr}
        rateFilm={movieApi.rateFilm}
        fetchRatedFilms={fetchRatedFilms} >
      </MovieSlider>
    </div >
  )
}
