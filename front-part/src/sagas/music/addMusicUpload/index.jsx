import { takeLatest, put, all } from 'redux-saga/effects'
import addMusicUploadActions, { addMusicUploadTypes } from '../../../redux/music/addMusicUpload/index'
import getAllUploadMusicActions from '../../../redux/music/getAllUploadMusic'
import { Post } from '../../../server/axios'

function* addMusicUploadSagas({ response }) {
    try {
        const res = yield Post("music/uploaded", response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getAllUploadMusicActions.getAllUploadMusicRequest()),
                yield put(addMusicUploadActions.addMusicUploadSuccess(res.data))
            ])
        } else {
            yield put(addMusicUploadActions.addMusicUploadFailure(res))
        }
    } catch (error) {
        yield put(addMusicUploadActions.addMusicUploadFailure(error))
    }
}

export function* addMusicUploadSaga() {
    yield takeLatest(addMusicUploadTypes.ADD_MUSIC_UPLOAD_REQUEST, addMusicUploadSagas)
}
