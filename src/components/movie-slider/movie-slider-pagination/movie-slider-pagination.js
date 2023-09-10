import { Pagination } from 'antd'
import './movie-slider-pagination.scss'
import PropTypes from 'prop-types'

export const MovieSliderPagination = (props) => {
  const { handleSetCurrPage, totalPages } = props

  return (
    <Pagination
      defaultCurrent={1}
      total={totalPages}
      onChange={(page) => {
        handleSetCurrPage(page)
      }}
    />
  )
}

MovieSliderPagination.propTypes = {
  handleSetCurrPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
}
