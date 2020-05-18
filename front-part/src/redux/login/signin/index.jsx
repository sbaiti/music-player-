import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    loginRequest: ['response'],
    loginSuccess: ['response', 'loading'],
    loginFailure: ['error'],
})

export const loginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    connected: false,
})

/* ------------- Reducers ------------- */
const loginSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        connected: true,
    })
const loginFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response,
        connected:false
    })
}

const loginRequest = state => state

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_FAILURE]: loginFailure,
})
