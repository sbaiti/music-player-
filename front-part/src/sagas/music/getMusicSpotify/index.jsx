import { takeLatest, put, all } from 'redux-saga/effects'
import getMusicSpotifyActions, { getMusicSpotifyTypes } from '../../../redux/music/getMusicSpotify/index'
import { Get } from '../../../server/axios'

function* getMusicSpotifySagas({ response }) {
    try {
        const res = yield Get(`music/playlists?token=${response}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getMusicSpotifyActions.getMusicSpotifySuccess(res.data.items)),
            ])
        } else {
            yield put(getMusicSpotifyActions.getMusicSpotifyFailure(res))
        }
    } catch (error) {
        yield put(getMusicSpotifyActions.getMusicSpotifyFailure(error))
    }
}

export function* getMusicSpotifySaga() {
    yield takeLatest(getMusicSpotifyTypes.GET_MUSIC_SPOTIFY_REQUEST, getMusicSpotifySagas)
}
