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
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /* useEffect(() => {
    const fetchGenres = async () => {
      const newGenresObj = await movieApi.getGenres();
      setGenresObj(newGenresObj);
    };
    fetchGenres();
    fetchRatedFilms();
    console.log(movieRatedArr)
  }, []); */
  useEffect(() => {
    const fetchGenres = async () => {
      const newGenresObj = await movieApi.getGenres();
      setGenresObj(newGenresObj);
    };
    fetchGenres();
    fetchRatedFilms();
  }, []);

  useEffect(() => {
    if (isRated) {
      fetchRatedFilms();
    }
    else if (searchValue !== '') {
      createFilms(searchValue)
    }
  }, [currPage]);

  const handleSetSearchValue = (value) => {
    setSearchValue(value)
  }

  const handleSetCurrPage = (value) => {
    setCurrPage(value)
  }

  const fetchRatedFilms = () => {
    setIsLoading(true)
    movieApi.getRatedFilms(currPage)
      .then((response) => {
        setTotalPages(response.total_pages)
        setMovieRatedArr(response.results)
        setIsLoading(false)
      })
  };

  const createFilms = (str) => {
    setIsLoading(true)
    movieApi.getFilms(str, currPage).then((response) => {
      setTotalPages(response.total_pages)
      setMovieArr(response.results)
      setIsLoading(false)
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
        handleSetSearchValue={handleSetSearchValue}
        searchValue={searchValue}
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
        fetchRatedFilms={fetchRatedFilms}
        handleSetCurrPage={handleSetCurrPage}
        totalPages={totalPages}
        isLoading={isLoading}>
      </MovieSlider>
    </div >
  )
}
