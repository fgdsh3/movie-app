import React, { useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'

import './search.scss'
import { AppContext } from '../../app/app'

export const Search = () => {
  const { createFilms, searchValue, handleSetSearchValue, handleSetIsLoading } = useContext(AppContext)

  const deferredCreateFilms = useCallback(
    debounce((value) => {
      createFilms(value)
    }, 500),
    []
  )

  const handleChange = (e) => {
    const value = e.target.value
    handleSetSearchValue(value)

    if (value.length !== 0) {
      handleSetIsLoading(true)
      deferredCreateFilms(value)
    }
  }

  return (
    <input
      className="header__search"
      type="search"
      placeholder="Type to search..."
      value={searchValue}
      onChange={handleChange}
    />
  )
}
