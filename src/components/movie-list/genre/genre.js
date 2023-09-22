import PropTypes from 'prop-types'

export const Genre = (props) => {
  const { label } = props

  return <button className="genre-btn">{label}</button>
}

Genre.propTypes = {
  label: PropTypes.string.isRequired,
}
