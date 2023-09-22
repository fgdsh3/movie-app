export class MovieApiService {

  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3/'
    this._apiKey = localStorage.getItem('key')
    this._apiToken = localStorage.getItem('token')
  }

  getResponseBody = async (url, options = {}) => {
    const res = await fetch(`${this._apiBase}${url}`, options)

    if (!res.ok) {
      throw new Error(`Cannot fetch ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  getGenres = async () => {
    const genresObj = {}
    const res = await this.getResponseBody(`genre/movie/list?api_key=${this._apiKey}&language=en`)
    res.genres.forEach(genre => {
      genresObj[genre.id] = genre.name
    })

    return genresObj
  }

  getFilms = async (inputValue, currPage) => {
    return await this.getResponseBody(`search/movie?api_key=${this._apiKey}&query=${inputValue}&include_adult=false&language=en-US&page=${currPage}`)
  }

  getGuestSessionId = async () => {
    try {
      const res = await this.getResponseBody(`authentication/guest_session/new?api_key=${this._apiKey}`)
      return res.guest_session_id
    }
    catch {
      throw new Error('Cannot fetch guest session')
    }
  }

  getRatedFilms = async (currPage) => {
    try {
      const guestSessionId = JSON.parse(localStorage.getItem('sessionId'))
      const res = await this.getResponseBody(`guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&page=${currPage}&language=en-US&sort_by=created_at.asc`)
      return res
    }
    catch {
      throw new Error('Cannot fetch rated films')
    }
  }

  rateMovie = async (movieId, method, rating) => {
    try {
      const guestSessionId = JSON.parse(localStorage.getItem('sessionId'))

      const requestOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this._apiToken
        },
        body: JSON.stringify({
          value: rating
        })
      }

      return await this.getResponseBody(`movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`, requestOptions)
    }
    catch {
      throw new Error('Cannot rate film')
    }
  }
}
