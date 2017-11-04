import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { isNull, pick } from 'lodash'
import { browserHistory } from 'react-router'
import { SET_USER } from '../../../store/user'
import { API_PATH } from '../../../constants'

import './SignInRouteView.scss'

class SignInRouteView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: null,
    }
  }

  onUsernameInput = (event) => {
    const { target: { value } } = event
    this.setState({ username: value })
  }

  onPasswordInput = (event) => {
    const { target: { value } } = event
    this.setState({ password: value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const options = pick(this.state, ['username', 'password'])

    axios.post(`${API_PATH}/sessions`, options)
      .then((response) => {
        const { jwt, username } = response.data
        sessionStorage.setItem('JWT', jwt)
        this.props.setUser({ jwt, username })
        browserHistory.push('/')
      })
      .catch((error) => {
        this.setState(error.response.data)
      })
  }

  renderError() {
    const { error } = this.state

    if (isNull(error)) { return null }

    return (
      <div className='sign-in-route-view__error'>
        {error}
      </div>
    )
  }

  render() {
    const { username, password } = this.state

    return (
      <form
        onSubmit={this.onSubmit}
      >
        {this.renderError()}
        <div>
          <input
            type='text'
            onInput={this.onUsernameInput}
            value={username}
            placeholder='Username...'
          />
        </div>
        <br />
        <div>
          <input
            type='password'
            onInput={this.onPasswordInput}
            value={password}
            placeholder='Password'
          />
        </div>

        <br />
        <button>Sign in</button>
      </form>
    )
  }
}

SignInRouteView.propTypes = {
  setUser: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => (dispatch({ type: SET_USER, payload: data }))
})

export default connect(null, mapDispatchToProps)(SignInRouteView)
