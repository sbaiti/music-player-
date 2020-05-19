import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addMusicUploadRequest: ['response'],
    addMusicUploadSuccess: ['response', 'loading'],
    addMusicUploadFailure: ['error'],
})

export const addMusicUploadTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addMusicUploadRequest = state => state.merge({ response: null })

const addMusicUploadSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const addMusicUploadFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_MUSIC_UPLOAD_REQUEST]: addMusicUploadRequest,
    [Types.ADD_MUSIC_UPLOAD_SUCCESS]: addMusicUploadSuccess,
    [Types.ADD_MUSIC_UPLOAD_FAILURE]: addMusicUploadFailure,
})
