import { combineReducers } from 'redux'
import { reducer as getMusicSpotify } from './getMusicSpotify'
import { reducer as addMusicUpload } from './addMusicUpload'
import { reducer as getAllUploadMusic } from './getAllUploadMusic'
import { reducer as getCurrentTrackPlay } from './changeCurrentTrackPlay'

export default combineReducers({
    getMusicSpotify,
    addMusicUpload,
    getAllUploadMusic,
    getCurrentTrackPlay
})
