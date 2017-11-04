import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UNDEFINED } from '../../store/user'
import './PageLayout.scss'

export const PageLayout = ({ children, user }) => {
  const content = (user === UNDEFINED)
    ? (
      <div>
        Please wait. Authentication
      </div>
    ) : children

  return (
    <div className='container text-center'>
      <div className='page-layout__viewport'>
        {content}
      </div>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node,
  user: PropTypes.any,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(PageLayout)
