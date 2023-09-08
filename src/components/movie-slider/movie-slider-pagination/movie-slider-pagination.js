import { Pagination } from 'antd';
import './movie-slider-pagination.scss';

export const MovieSliderPagination = (props) => {

  const { currPage, handleSetCurrPage, totalPages } = props;

  return (
    <Pagination defaultCurrent={1} total={totalPages} onChange={(page) => {
      handleSetCurrPage(page)
    }} />
  )
} 
