import { useEffect } from 'react'
import { Spin, Alert } from 'antd'
import './movie-slider.scss'
import PropTypes from 'prop-types'

import { MovieSlideItem } from './movie-slide-item'
import { MovieSliderPagination } from './movie-slider-pagination'


export const MovieSlider = (props) => {

  const {
    movieArr, createImg, genresObj, isRated, rateFilm, movieRatedArr, fetchRatedFilms, currPage, handleSetCurrPage, totalPages, isLoading, fetchFailed
  } = props

  useEffect(() => {
    fetchRatedFilms()
  }, [isRated])

  const movies = () => {

    let arr = movieArr

    if (isRated) {
      arr = movieRatedArr
    }

    return arr.map((movie) => {
      return (
        <MovieSlideItem
          key={movie.id}
          movieId={movie.id}
          voteAverage={movie.vote_average.toFixed(1)}
          date={movie.release_date}
          title={movie.title}
          imgSrc={createImg(movie.poster_path)}
          genreIds={movie.genre_ids}
          genresObj={genresObj}
          movie={movie}
          rateFilm={rateFilm}
          isRated={isRated}
          movieRating={movie.rating}
          fetchRatedFilms={fetchRatedFilms}
          text={() => {
            if (movie.overview.length > 200) {
              const lastSpace = movie.overview.lastIndexOf(' ', 200)
              let slicedMovieText = movie.overview.slice(0, lastSpace)
              slicedMovieText += ' ...'
              return slicedMovieText
            }
            return movie.overview
          }}>

        </MovieSlideItem >
      )
    })
  }
  if (fetchFailed) {
    return (
      <div className="movie-slider" >
        <Alert
          message="Loading error"
          description="Please, turn on VPN and reload site"
          type="error"
          closable
        />
        <MovieSliderPagination
          currPage={currPage}
          handleSetCurrPage={handleSetCurrPage}
          totalPages={totalPages}></MovieSliderPagination>
      </div >
    )
  }

  else if (isLoading) {
    return (
      <div className="movie-slider">
        <Spin ></Spin>
        <MovieSliderPagination
          currPage={currPage}
          handleSetCurrPage={handleSetCurrPage}
          totalPages={totalPages}></MovieSliderPagination>
      </div>
    )
  }

  return (
    <div className="movie-slider">
      <div className="movie-slide">
        {movies()}
      </div>
      <MovieSliderPagination
        currPage={currPage}
        handleSetCurrPage={handleSetCurrPage}
        totalPages={totalPages}></MovieSliderPagination>
    </div>
  )
}

MovieSlider.propTypes = {
  movieArr: PropTypes.array.isRequired,
  createImg: PropTypes.func.isRequired,
  genresObj: PropTypes.object.isRequired,
  isRated: PropTypes.bool.isRequired,
  rateFilm: PropTypes.func.isRequired,
  movieRatedArr: PropTypes.array.isRequired,
  fetchRatedFilms: PropTypes.func.isRequired,
  currPage: PropTypes.number,
  handleSetCurrPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchFailed: PropTypes.bool.isRequired
}

MovieSlider.defaultProps = {
  currPage: 1,
}