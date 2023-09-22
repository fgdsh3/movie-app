import { MovieApiService } from './api'

class LocalStorageService {
  constructor() {
    this._apiKey = '4ebd101a897f026b863b099e65dd40aa'
    this._apiToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWJkMTAxYTg5N2YwMjZiODYzYjA5OWU2NWRkNDBhYSIsInN1YiI6IjY0ZTA5ZTM4YTNiNWU2MDFkNjNhNzg3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MYI-y3ovfrHVd0jW6YIdwBgJhfmWdttD7uXVNKzqQa'
    this.addTokenToLocalStorage()
    this.addKeyToLocalStorage()
    this.movieApi = new MovieApiService()
  }

  addTokenToLocalStorage() {
    localStorage.setItem('token', this._apiToken)
  }

  addKeyToLocalStorage() {
    localStorage.setItem('key', this._apiKey)
  }

  getSessionIdToStorage = async () => {
    try {
      const sessionId = await this.movieApi.getGuestSessionId()
      localStorage.setItem('sessionId', JSON.stringify(sessionId))
    }
    catch {
      throw new Error('Cannot fetch guest session')
    }
  }
}

export { LocalStorageService }