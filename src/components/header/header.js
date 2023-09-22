import React from 'react'
import './header.scss'
import { PropTypes } from 'prop-types'

import { HeaderButtons } from './header-buttons'
import { Search } from './search/search'

export const Header = (props) => {
  const { isRated } = props

  if (isRated) {
    return (
      <header>
        <HeaderButtons isRated={isRated} ></HeaderButtons>
      </header>
    )
  }

  return (
    <header>
      <HeaderButtons isRated={isRated} ></HeaderButtons>
      <Search></Search>
    </header>
  )
}

Header.propTypes = {
  isRated: PropTypes.bool.isRequired,
}
