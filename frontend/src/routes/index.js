// We only need to import the modules necessary for initial render
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import { isNull } from 'lodash'
import axios from 'axios'
import { SET_USER, UNDEFINED } from '../store/user'
import { API_PATH } from '../constants'
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home/components/HomeView'
import SignInRoute from './SignInRoute/components/SignInRouteView'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

    // path        : '/',
    // component   : CoreLayout,
    // indexRoute  : Home,
    // childRoutes : [
    //   SignInRoute(store),
    // ]

export const createRoutes = (store) => {
  const history = syncHistoryWithStore(browserHistory, store)

  const getUser = (_nextState, _replace, callback) => {
    const jwt = sessionStorage.getItem('JWT')

    if (isNull(jwt)) {
      store.dispatch({ type: SET_USER, payload: null })
      callback()
      return
    }

    axios.get(`${API_PATH}/user?jwt=${jwt}`)
      .then((response) => {
        store.dispatch({ type: SET_USER, payload: response.data })
        callback()
      })
      .catch((response) => {
        store.dispatch({ type: SET_USER, payload: null })
        callback()
      })
  }

  const onAuthRequired = (nextState, replace, callback) => {
    const user = store.getState().user

    if (isNull(user)) {
      store.dispatch(push('/sign_in'))
    }

    callback()
  }

  return (
    <Router history={history}>
      <Route path='/' component={CoreLayout} onEnter={getUser}>
        <IndexRoute component={Home} onEnter={onAuthRequired} />
        <Route path='sign_in' component={SignInRoute} />
      </Route>
    </Router>
  )
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
