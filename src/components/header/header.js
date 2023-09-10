import React from 'react'
import './header.scss'
import { PropTypes } from 'prop-types'

import { HeaderButtons } from './header-buttons'
import { Search } from './search/search'

export const Header = (props) => {
  const { createFilms, isRated, setIsRated, searchValue, handleSetSearchValue } = props

  if (isRated) {
    return (
      <header>
        <HeaderButtons isRated={isRated} setIsRated={setIsRated}></HeaderButtons>
      </header>
    )
  }

  return (
    <header>
      <HeaderButtons isRated={isRated} setIsRated={setIsRated}></HeaderButtons>
      <Search createFilms={createFilms} searchValue={searchValue} handleSetSearchValue={handleSetSearchValue}></Search>
    </header>
  )
}

Header.propTypes = {
  createFilms: PropTypes.func.isRequired,
  isRated: PropTypes.bool.isRequired,
  setIsRated: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  handleSetSearchValue: PropTypes.func.isRequired,
}
