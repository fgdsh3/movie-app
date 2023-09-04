import { useEffect, useState } from 'react';
import './header-buttons.scss';

export const HeaderButtons = (props) => {

  const {
    setIsRated
  } = props;
  const [activeBtn, setActiveBtn] = useState('search');

  useEffect(() => {
    if (activeBtn === 'rated') {
      setIsRated(true);
    }
    else {
      setIsRated(false);
    }
  }, [activeBtn])


  return (
    <div className="header__btns">
      <button
        className={activeBtn === 'search' ? 'search-btn active-btn' : 'search-btn'}
        onClick={() => {
          setActiveBtn('search');
        }}>Search</button>
      <button
        className={activeBtn === 'rated' ? 'rated-btn active-btn' : 'rated-btn'}
        onClick={() => {
          setActiveBtn('rated');
        }}>Rated</button>
    </div >
  )
}
