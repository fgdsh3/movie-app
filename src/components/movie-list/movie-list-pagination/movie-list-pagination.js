import { useContext } from 'react'
import { Pagination } from 'antd'
import './movie-list-pagination.scss'
import PropTypes from 'prop-types'

import { AppContext } from '../../app/app'

export const MovieListPagination = (props) => {
  const { totalPages, current } = props
  const { handleSetCurrPage } = useContext(AppContext)

  return (
    <Pagination
      defaultPageSize={1}
      defaultCurrent={current}
      total={totalPages}
      onChange={(page) => {
        handleSetCurrPage(page)
      }}
    />
  )
}

MovieListPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
}
