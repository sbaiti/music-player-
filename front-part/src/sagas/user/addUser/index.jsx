import { takeLatest, put, all } from 'redux-saga/effects'
import addUserActions, { addUserTypes } from '../../../redux/user/addUser/index'
import { Post } from '../../../server/axios'

function* addUserSagas({ response }) {
    try {
        const res = yield Post('user/addUser', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addUserActions.addUserSuccess(res.data)),
            ])
        } else {
            yield put(addUserActions.addUserFailure(res))
        }
    } catch (error) {
        yield put(addUserActions.addUserFailure(error))
    }
}

export function* addUserSaga() {
    yield takeLatest(addUserTypes.ADD_USER_REQUEST, addUserSagas)
}
