import React, { useCallback, useMemo } from "react";
import debounce from 'lodash/debounce';
import './search.scss';

export const Search = (props) => {

  const { createFilms } = props;

  const deferredCreateFilms = useMemo(
    () => debounce((value) => {
      createFilms(value);
    }, 500),
    [createFilms]
  );

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.length !== 0) {
      deferredCreateFilms(value);
    }
  };

  return (
    <input
      className="header__search"
      type="search"
      placeholder="Type to search..."
      onChange={handleChange}
    />
  )
}

