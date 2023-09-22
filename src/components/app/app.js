import React, { useState, useEffect, createContext } from 'react'

import './app.scss'
import { Header } from '../header'
import { MovieList } from '../movie-list'
import { MovieApiService } from '../../services/api'
import { LocalStorageService } from '../../services/local-storage.js'

export const AppContext = createContext()

export const App = () => {
  const movieApi = new MovieApiService()
  const localStorageService = new LocalStorageService()
  const [movieArr, setMovieArr] = useState([])
  const [movieRatedArr, setMovieRatedArr] = useState([])
  const [genresObj, setGenresObj] = useState({})
  const [isRated, setIsRated] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [ratedCurrPage, setRatedCurrPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [ratedTotalPages, setRatedTotalPages] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [isEstimated, setIsEstimated] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchGenres = () => {
          movieApi
            .getGenres()
            .then((response) => {
              setFetchFailed(false)
              setGenresObj(response)
            })
            .catch(() => {
              setFetchFailed(true)
              throw new Error('Cannot fetch genres')
            })
        }
        fetchGenres()
        await localStorageService.getSessionIdToStorage()
      }
      catch {
        setFetchFailed(true)
        throw new Error('cannot fetch data')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isRated) {
      fetchRatedFilms()
    } else if (searchValue !== '') {
      createFilms(searchValue)
    }
  }, [currPage, ratedCurrPage])

  useEffect(() => {
    setIsLoading(false)
    setHasData(true)
  }, [movieArr])

  useEffect(() => {
    if (!isEstimated && isRated) {
      fetchRatedFilms()
    }
  }, [isEstimated, isRated])

  const handleSetSearchValue = (value) => {
    setSearchValue(value)
  }

  const handleSetIsLoading = (bool) => {
    setIsLoading(bool)
  }

  const handleSetCurrPage = (num) => {
    if (isRated) {
      setRatedCurrPage(num)
    }
    else {
      setCurrPage(num)
    }
  }

  const fetchRatedFilms = () => {
    setHasData(false)
    setIsLoading(true)
    movieApi
      .getRatedFilms(ratedCurrPage)
      .then((response) => {
        setFetchFailed(false)
        setRatedTotalPages(response.total_pages)
        setMovieRatedArr(response.results)
        if (isRated) {
          setIsLoading(false)
          setHasData(true)
        }
      })
      .catch(() => {
        setFetchFailed(true)
        throw new Error('Cannot fetch ratedFilms')
      })
  }

  const createFilms = (str) => {
    setHasData(false)
    setIsLoading(true)
    fetchRatedFilms()
    movieApi
      .getFilms(str, currPage)
      .then((response) => {
        setFetchFailed(false)
        setMovieArr(response.results)
        setTotalPages(response.total_pages)
      })
      .catch(() => {
        setFetchFailed(true)
        throw new Error('Cannot fetch films')
      })
  }

  const createImg = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original'
    return `${baseUrl}${path}`
  }

  const rateFilm = async (movieId, method, rating) => {
    setIsEstimated(true)
    const response = await movieApi.rateMovie(movieId, method, rating)
    setIsEstimated(false)
    if (isRated) {
      fetchRatedFilms()
    }
    return response
  }

  return (
    <AppContext.Provider value={{ createFilms, handleSetIsLoading, searchValue, handleSetSearchValue, setIsRated, handleSetCurrPage, rateFilm }} >
      <div className="app container">
        <Header
          isRated={isRated}
        ></Header>
        <MovieList
          movieArr={movieArr}
          movieRatedArr={movieRatedArr}
          createImg={createImg}
          genresObj={genresObj}
          isRated={isRated}
          rateFilm={rateFilm}
          fetchRatedFilms={fetchRatedFilms}
          totalPages={totalPages}
          ratedTotalPages={ratedTotalPages}
          isLoading={isLoading}
          fetchFailed={fetchFailed}
          searchValue={searchValue}
          currPage={currPage}
          ratedCurrPage={ratedCurrPage}
          hasData={hasData} ></MovieList>
      </div>
    </AppContext.Provider >
  )
}
