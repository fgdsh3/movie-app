/* import React, { useCallback, useMemo } from "react";
import debounce from 'lodash/debounce';
import './search.scss';

export const Search = (props) => {

  const { createFilms, searchValue, handleSetSearchValue } = props;

  const deferredCreateFilms = useMemo(
    () => debounce((value) => {
      createFilms(value);
    }, 500),
    [createFilms]
  );

  const handleChange = (e) => {
    handleSetSearchValue(e.target.value)

    if (searchValue.length !== 0) {
      deferredCreateFilms(searchValue);
    }
  };

  return (
    <input
      className="header__search"
      type="search"
      placeholder="Type to search..."
      onChange={(e) => {
        handleChange(e)
      }}
    />
  )
}

 */
import React, { useCallback, useMemo } from "react";
import debounce from 'lodash/debounce';
import './search.scss'

export const Search = (props) => {
  const { createFilms, searchValue, handleSetSearchValue } = props;

  const deferredCreateFilms = useCallback(
    debounce((value) => {
      createFilms(value);
    }, 500),
    [createFilms]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    handleSetSearchValue(value);

    if (value.length !== 0) {
      deferredCreateFilms(value);
    }
  };

  return (
    <input
      className="header__search"
      type="search"
      placeholder="Type to search..."
      value={searchValue}
      onChange={handleChange}
    />
  );
};