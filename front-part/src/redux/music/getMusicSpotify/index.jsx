import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getMusicSpotifyRequest: ['response'],
    getMusicSpotifySuccess: ['response', 'loading'],
    getMusicSpotifyFailure: ['error'],
})

export const getMusicSpotifyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const getMusicSpotifyRequest = state => state.merge({ response: null })

const getMusicSpotifySuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const getMusicSpotifyFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_MUSIC_SPOTIFY_REQUEST]: getMusicSpotifyRequest,
    [Types.GET_MUSIC_SPOTIFY_SUCCESS]: getMusicSpotifySuccess,
    [Types.GET_MUSIC_SPOTIFY_FAILURE]: getMusicSpotifyFailure,
})
