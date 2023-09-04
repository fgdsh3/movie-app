import './movie-slide-item.scss';
import { Genre } from '../genre';
import { Rate } from 'antd';
import { format } from 'date-fns'
import { useState } from 'react';
import { varsObj } from '../../../global-vars';

let { PREV_CLICKED_STAR } = varsObj

export const MovieSlideItem = (props) => {

  const { movieId, imgSrc, title, date, genreIds, genresObj, text, rateFilm, fetchRatedFilms } = props;
  const [movieIsRated, setMovieIsRated] = useState(false);
  const [value, setValue] = useState(0);

  const releaseDate = new Date(date);
  const MonthFullname = format(releaseDate, 'MMMM');
  const visibleReleaseDate = `${MonthFullname} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`

  /*  useEffect(() => {
     if (movieIsRated) {
       const newMovieRatedArr = [...movieRatedArr.slice(0, index), ...movieRatedArr.slice(index + 1)]
       setMovieRatedArr(newMovieRatedArr)
     }
     else {
       const newMovieRatedArr = [...movieRatedArr, movie]
       setMovieRatedArr(newMovieRatedArr)
     }
   },
     [movieIsRated]) */

  const checkStarsClick = (value) => {
    if (PREV_CLICKED_STAR === null || value.target !== PREV_CLICKED_STAR) {
      setMovieIsRated(true);
      rateFilm(movieId, 'POST', value);
    }
    else {
      setMovieIsRated(!movieIsRated)
      rateFilm(movieId, 'DELETE', value);
    }
    fetchRatedFilms()
    PREV_CLICKED_STAR = value.target;
    console.log(value)
  }

  const createGenres = () => {
    return genreIds.map(genreId => (
      <Genre key={genreId} label={genresObj[genreId]} ></Genre>
    ));
  }

  return (
    <div className="slide-item">
      <img className="slide-item__img" src={imgSrc} alt="poster"></img>
      <div className="slide-item__content">
        <h4 className="slide-item__content-title">
          {title}
        </h4>
        <span className="slide-item__content-date">
          {visibleReleaseDate}
        </span>
        <div className="slide-item__content-genres">
          {createGenres(genreIds)}
        </div>
        <p className="slide-item__content-text">
          {text()}
        </p>
        <Rate
          allowHalf
          defaultValue={0}
          count={10}
          onChange={(value) => {
            setValue(value)
            checkStarsClick(value);
          }} />
      </div>
    </div>
  )
}
