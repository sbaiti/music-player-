import { takeLatest, put, all } from 'redux-saga/effects'
import loginActions, { loginTypes } from '../../../redux/login/signin/index'
import { Post } from '../../../server/axios'

function* loginSagas({ response }) {
    try {
        const res = yield Post('user/login', response);
        if (res.status === 200) {
            yield all([
                yield localStorage.setItem('appToken', res.data.token),
                yield localStorage.setItem('idUser', res.data.user._id),
                yield put(loginActions.loginSuccess(res.data))
            ])
        } else {
            yield put(loginActions.loginFailure(res))
        }
    } catch (error) {
        yield put(loginActions.loginFailure(error))
    }
}

export function* loginSaga() {
    yield takeLatest(loginTypes.LOGIN_REQUEST, loginSagas)
}
