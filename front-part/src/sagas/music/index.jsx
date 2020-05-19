import { getMusicSpotifySaga } from './getMusicSpotify'
import { addMusicUploadSaga } from './addMusicUpload'
import { getAllUploadMusicSaga } from './getAllUploadMusic'

const musicSagas = [
    getMusicSpotifySaga,
    addMusicUploadSaga,
    getAllUploadMusicSaga
]

export default musicSagas
