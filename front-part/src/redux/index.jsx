import { combineReducers } from 'redux'
import user from './user'
import login from './login'
import music from './music'

const containersReducer = {
    user,
    login,
    music
}

const appReducer = combineReducers({
    ...containersReducer
})

export const createGlobalReducer = (state, action) => {
    if (action.type === 'SIGNOUT_REQUEST') {
        state = {}
        localStorage.setItem('appToken', '');
        localStorage.setItem('idUser', "")
    }
    return appReducer(state, action)
}

export default createGlobalReducer