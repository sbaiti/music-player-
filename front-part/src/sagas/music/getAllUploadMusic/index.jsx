import { takeLatest, put, all } from 'redux-saga/effects'
import getAllUploadMusicActions, { getAllUploadMusicTypes } from '../../../redux/music/getAllUploadMusic'
import { Get } from '../../../server/axios'
const idUser = localStorage.getItem('idUser');

function* getAllUploadMusicSagas() {
    try {
        const res = yield Get(`music/allMusicUploaded?idUser=${idUser}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getAllUploadMusicActions.getAllUploadMusicSuccess(res.data)),
            ])
        } else {
            yield put(getAllUploadMusicActions.getAllUploadMusicFailure(res))
        }
    } catch (error) {
        yield put(getAllUploadMusicActions.getAllUploadMusicFailure(error))
    }
}

export function* getAllUploadMusicSaga() {
    yield takeLatest(getAllUploadMusicTypes.GET_ALL_UPLOAD_MUSIC_REQUEST, getAllUploadMusicSagas)
}
