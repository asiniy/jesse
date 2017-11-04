export const SET_USER = 'SET_USER'

export const UNDEFINED = 'UNDEFINED' // Initial state, not action name

export const initialState = UNDEFINED
export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}
