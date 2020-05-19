import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    changeCurrentTrack: ['track'],
})

export const trackTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    track: 0,
})

/* ------------- Reducers ------------- */
const changeCurrentTrack = (state, { track }) =>
    state.merge({
        track,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_CURRENT_TRACK]: changeCurrentTrack,
})