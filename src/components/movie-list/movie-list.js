import { Spin, Alert } from 'antd'
import './movie-list.scss'
import PropTypes from 'prop-types'

import { MovieListItem } from './movie-list-item'
import { MovieListPagination } from './movie-list-pagination'


export const MovieList = (props) => {

  const {
    movieArr, movieRatedArr, createImg, genresObj, isRated, fetchRatedFilms, currPage, totalPages, isLoading, fetchFailed, searchValue, hasData, ratedTotalPages, ratedCurrPage
  } = props

  const sliceText = (movieText) => {
    if (movieText.length > 200) {
      const lastSpace = movieText.lastIndexOf(' ', 200)
      let slicedMovieText = movieText.slice(0, lastSpace)
      slicedMovieText += ' ...'
      return slicedMovieText
    }
    return movieText
  }

  const createFullMovies = () => {

    return (isRated ? movieRatedArr : movieArr).map((movie) => {
      return (
        <MovieListItem
          key={movie.id}
          movieId={movie.id}
          voteAverage={movie.vote_average.toFixed(1)}
          date={movie.release_date}
          title={movie.title}
          imgSrc={createImg(movie.poster_path)}
          genreIds={movie.genre_ids}
          genresObj={genresObj}
          movie={movie}
          movieRatedArr={movieRatedArr}
          isRated={isRated}
          fetchRatedFilms={fetchRatedFilms}
          getText={() => {
            return sliceText(movie.overview)
          }}>
        </MovieListItem >
      )
    })
  }

  return (
    <div className="movie-list">
      {fetchFailed ? (
        <Alert
          message="Loading error"
          description="Please, turn on VPN and reload site"
          type="error"
          closable
        />
      ) : isLoading ? (
        <Spin></Spin>
      ) : !isRated && hasData && searchValue.length !== 0 && movieArr.length === 0 ? (
        <Alert message="No films found" type="info" />
      ) : isRated && hasData && searchValue.length !== 0 && movieArr.length === 0 ? (
        <Alert message="No Rated films found" type="info" />
      ) : (
        <div className="movie-list-box">
          {createFullMovies()}
        </div>
      )}
      <MovieListPagination
        current={isRated ? ratedCurrPage : currPage}
        totalPages={isRated ? ratedTotalPages : totalPages}></MovieListPagination>
    </div>
  )
}

MovieList.propTypes = {
  movieArr: PropTypes.array.isRequired,
  createImg: PropTypes.func.isRequired,
  genresObj: PropTypes.object.isRequired,
  isRated: PropTypes.bool.isRequired,
  fetchRatedFilms: PropTypes.func.isRequired,
  currPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchFailed: PropTypes.bool.isRequired
}
