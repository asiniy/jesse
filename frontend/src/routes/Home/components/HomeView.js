import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const HomeView = ({ username }) => (
  <div>
    <h4>Safe page for {username}</h4>
    <img alt='This is a duck, because Jesse!' className='duck' src={DuckImage} />
  </div>
)

HomeView.propTypes = {
  username: PropTypes.string.isRequired,
}

const mapStateToProps = (store) => ({
  username: get(store, 'user.username'),
})

export default connect(mapStateToProps)(HomeView)
