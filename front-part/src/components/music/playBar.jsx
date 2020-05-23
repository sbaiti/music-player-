import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ProgressBar from './pregressBar';
import FormControlPlayBar from './formControlPlayBar';
import url from '../../server/baseUrl.json'
import ChangeCurrentTrackActions from '../../redux/music/changeCurrentTrackPlay/index'
import PlayListAnimation from '../ui/animations/playListAnimation'

const Playbar = ({ musicTracks, index, changeCurrentTrackReq }) => {
    Playbar.defaultProps = {
        musicTracks: []
    }

    /* hooks */
    const audioTag = useRef(null);
    const [track, setTrack] = useState(null);
    const [playing, setPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(true);

    useEffect(() => {
        setTrack(musicTracks[index])
    }, [index])

    /* functions */

    const updateProgress = () => {
        setCurrentTime(audioTag.current.currentTime)
    }

    const playNextTrack = () => {
        if (index === musicTracks.length - 1)
            changeCurrentTrackReq(0)
        else
            changeCurrentTrackReq(index + 1)
    }

    const playPreviewTrack = () => {
        if (index === 0)
            changeCurrentTrackReq(musicTracks.length - 1)
        else
            changeCurrentTrackReq(index - 1)
    }

    if (!track) return (<div></div>);
    return (
        <div>
            <PlayListAnimation playing={playing} />
            <div className="playbar">
                <audio id='audio' autoPlay preload="auto"
                    src={`${url.REACT_APP_BASE_URL}music/musicsByName?audio=` + track.file}
                    type="audio/mpeg"
                    ref={(tag) => { audioTag.current = tag }}
                    onTimeUpdate={updateProgress}
                    onEnded={playNextTrack}
                />

                <FormControlPlayBar
                    audio={audioTag.current}
                    playing={playing}
                    togglePlay={() => setPlaying(!playing)}
                    playNextTrack={playNextTrack}
                    playPreviewTrack={playPreviewTrack}
                />

                <ProgressBar audio={audioTag.current} />
                {track.file}
            </div>
        </div>
    )
}

Playbar.propTypes = {
    musicTracks: PropTypes.array,
    history: PropTypes.object,
    index: PropTypes.number,
    changeCurrentTrackReq: PropTypes.func
};

const mapStateToProps = ({ music }) => ({
    musicTracks: music.getAllUploadMusic.response.musics,
    index: music.getCurrentTrackPlay.track
})

const mapDispatchToProps = dispatch => ({
    changeCurrentTrackReq: (track) => dispatch(ChangeCurrentTrackActions.changeCurrentTrack(track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playbar);
