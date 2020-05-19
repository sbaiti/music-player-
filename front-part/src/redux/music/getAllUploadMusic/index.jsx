import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllUploadMusicRequest: ['response'],
    getAllUploadMusicSuccess: ['response', 'loading'],
    getAllUploadMusicFailure: ['error'],
})

export const getAllUploadMusicTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const getAllUploadMusicRequest = state => state.merge({ response: null })

const getAllUploadMusicSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const getAllUploadMusicFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_UPLOAD_MUSIC_REQUEST]: getAllUploadMusicRequest,
    [Types.GET_ALL_UPLOAD_MUSIC_SUCCESS]: getAllUploadMusicSuccess,
    [Types.GET_ALL_UPLOAD_MUSIC_FAILURE]: getAllUploadMusicFailure,
})
