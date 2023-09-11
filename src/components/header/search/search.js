import React, { useCallback } from 'react'
import debounce from 'lodash/debounce'
import './search.scss'
import PropTypes from 'prop-types'

export const Search = (props) => {
  const { createFilms, searchValue, handleSetSearchValue } = props

  const deferredCreateFilms = useCallback(
    debounce(() => {
      createFilms(searchValue)
    }, 500),
    []
  )

  const handleChange = (e) => {
    const value = e.target.value
    handleSetSearchValue(value)

    if (value.length !== 0) {
      deferredCreateFilms(searchValue)
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

Search.propTypes = {
  createFilms: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  handleSetSearchValue: PropTypes.func.isRequired,
}
