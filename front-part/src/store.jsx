import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from "history";
import createSagaMiddleware from 'redux-saga'
import createGlobalReducer from './redux'
import globalSagas from './sagas'

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose

const store = createStore(
    createGlobalReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(globalSagas)

export { history }
export default store;