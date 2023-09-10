import './movie-slide-item.scss'
import { Rate } from 'antd'
import { format } from 'date-fns'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { Genre } from '../genre'

export const MovieSlideItem = (props) => {
  const { movieId, isRated, imgSrc, title, date, genreIds, genresObj, getText, movieRating, rateFilm, voteAverage } =
    props
  const [movieIsRated, setMovieIsRated] = useState(false)
  const [prevClickedStar, setPrevClickedStar] = useState(null)

  let visibleReleaseDate
  let ratingColor = 'low-color'

  if (voteAverage >= 3 && voteAverage < 5) {
    ratingColor = 'below-middle-color'
  } else if (voteAverage >= 5 && voteAverage < 7) {
    ratingColor = 'above-middle-color'
  } else if (voteAverage > 7) {
    ratingColor = 'high-color'
  }

  let posterSrc = imgSrc
  if (posterSrc === 'https://image.tmdb.org/t/p/originalnull') {
    posterSrc = '/no-poster.jpg'
  }
  if (date.length === 0) {
    visibleReleaseDate = ''
  }
  if (date.length > 0) {
    const releaseDate = new Date(date)
    const MonthFullname = format(releaseDate, 'MMMM')
    visibleReleaseDate = `${MonthFullname} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`
  }

  let defaultValue = 0

  if (movieRating) {
    defaultValue = movieRating
  }

  const checkStarsClick = (value) => {
    if (isRated) {
      setMovieIsRated(true)
    }

    if (prevClickedStar === null || value.target !== prevClickedStar) {
      setMovieIsRated(true)
      rateFilm(movieId, 'POST', value)
    } else {
      setMovieIsRated(!movieIsRated)
      rateFilm(movieId, 'DELETE', value)
    }
    setPrevClickedStar(() => value.target)
  }

  const createGenres = () => {
    return genreIds.map((genreId) => <Genre key={genreId} label={genresObj[genreId]}></Genre>)
  }
  return (
    <div className="slide-item">
      <div className="slide-item__img-box">
        <img className="slide-item__img" src={posterSrc} alt="poster"></img>
      </div>
      <div className="slide-item__content">
        <h4 className="slide-item__title">{title}</h4>
        <div className={`slide-item__vote-average ${ratingColor}`}>{voteAverage}</div>
        <span className="slide-item__date">{visibleReleaseDate}</span>
        <div className="slide-item__genres">{createGenres(genreIds)}</div>
        <p className="slide-item__text">{getText()}</p>
        <Rate
          allowHalf
          defaultValue={defaultValue}
          count={10}
          onChange={(value) => {
            checkStarsClick(value)
          }}
        />
      </div>
    </div>
  )
}
MovieSlideItem.propTypes = {
  movieId: PropTypes.number.isRequired,
  isRated: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  genreIds: PropTypes.array.isRequired,
  genresObj: PropTypes.object.isRequired,
  getText: PropTypes.func.isRequired,
  movieRating: PropTypes.number,
  rateFilm: PropTypes.func.isRequired,
  voteAverage: PropTypes.string.isRequired,
}

MovieSlideItem.defaultProps = {
  movieRating: 0,
}
