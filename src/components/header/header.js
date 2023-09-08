import React from 'react';
import './header.scss';
import { HeaderButtons } from './header-buttons';
import { Search } from './search/search';

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

