import { fork, all, call, take } from 'redux-saga/effects'
import user from './user'
import login from './login'
import music from  './music'

export const takeFirst = (pattern, saga, ...args) =>
    fork(function* first() {
        while (true) {
            const action = yield take(pattern)
            yield call(saga, ...args.concat(action))
        }
    })

const sagas = [
    ...user,
    ...login,
    ...music
]

function* globalSagas() {
    const globalSagasForks = sagas.filter(saga => saga !== undefined).map(saga => fork(saga))
    yield all([...globalSagasForks])
}

export default globalSagas