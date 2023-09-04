import { useEffect } from 'react';
import './movie-slider.scss';
import { MovieSlideItem } from './movie-slide-item';


export const MovieSlider = (props) => {

  const {
    movieArr, createImg, genresObj, isRated, rateFilm, movieRatedArr, fetchRatedFilms
  } = props;

  useEffect(() => {
    fetchRatedFilms();
  }, [isRated])

  const movies = () => {

    let arr = movieArr;

    if (isRated) {
      arr = movieRatedArr;
    }

    return arr.map((movie) => {
      return (
        <MovieSlideItem
          key={movie.id}
          movieId={movie.id}
          date={movie.release_date}
          title={movie.title}
          imgSrc={createImg(movie.poster_path)}
          genreIds={movie.genre_ids}
          genresObj={genresObj}
          movie={movie}
          rateFilm={rateFilm}
          fetchRatedFilms={fetchRatedFilms}
          text={() => {
            if (movie.overview.length > 200) {
              const lastSpace = movie.overview.lastIndexOf(' ', 200);
              let slicedMovieText = movie.overview.slice(0, lastSpace);
              slicedMovieText += ' ...';
              return slicedMovieText;
            }
            return movie.overview;
          }}>

        </MovieSlideItem >
      )
    })
  }

  return (
    <div className="movie-slider">
      <div className="movie-slide">
        {movies()}
      </div>
    </div>
  )
}
