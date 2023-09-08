export class MovieApiService {

  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3/';
    this._apiKey = '4ebd101a897f026b863b099e65dd40aa';
    this._apiToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWJkMTAxYTg5N2YwMjZiODYzYjA5OWU2NWRkNDBhYSIsInN1YiI6IjY0ZTA5ZTM4YTNiNWU2MDFkNjNhNzg3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MYI-y3ovfrHVd0jW6YIdwBgJhfmWdttD7uXVNKzqQa';
    this.getSessionIdToStorage()
  }

  getResponseBody = async (url, options = {}) => {

    const res = await fetch(`${this._apiBase}${url}`, options);

    if (!res.ok) {
      throw new Error(`Cannot fetch ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  getGenres = async () => {
    const genresObj = {};
    const res = await this.getResponseBody(`genre/movie/list?api_key=${this._apiKey}&language=en`)

    res.genres.forEach(genre => {
      genresObj[genre.id] = genre.name;
    })

    return genresObj;
  };

  getFilms = async (inputValue, currPage) => {
    return await this.getResponseBody(`search/movie?api_key=${this._apiKey}&query=${inputValue}&include_adult=false&language=en-US&page=${currPage}`);
  }

  getGuestSessionId = async () => {
    const res = await this.getResponseBody(`authentication/guest_session/new?api_key=${this._apiKey}`);
    return res.guest_session_id;
  }

  getSessionIdToStorage = () => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (!storedSessionId) {

      this.getGuestSessionId().then(sessionId => {
        localStorage.setItem('sessionId', JSON.stringify(sessionId));
      })
    }
    setInterval(() => {
      localStorage.removeItem('sessionId')
    }, 1800000);
  }

  /*  getRatedFilms = async () => {
     const guestSessionId = JSON.parse(localStorage.getItem('sessionId'))
     return await this.getResponseBody(`guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&page=1`, {
       headers: {
         accept: 'application/json',
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmM5NzJlYzYxNTUwY2E1MGNmYWIxOWQ3YmU4Zjc2NW9uIjoxfQ.yhRaMkmm9A1WQgguFVHCv_Xf-zReGPMYtwmh2opEhSc'
       }
     });
   } */
  getRatedFilms = async (currPage) => {
    const guestSessionId = JSON.parse(localStorage.getItem('sessionId'))
    const res = await this.getResponseBody(`guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&page=${currPage}&language=en-US&sort_by=created_at.asc`);
    return res
  }

  rateFilm = async (movieId, method, rating) => {
    const guestSessionId = JSON.parse(localStorage.getItem('sessionId'));

    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': this._apiToken
      },
      body: JSON.stringify({
        value: rating
      })
    };

    return await this.getResponseBody(
      `movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`,
      requestOptions
    );
  }
}


/*   getAllFilms = async () => {
    return await this.getResponseBody('trending/movie/day?api_key=4ebd101a897f026b863b099e65dd40aa&language=en-US')
  } */