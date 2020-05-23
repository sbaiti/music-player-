import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';

const FormControlPlayBar = ({ audio, playNextTrack, togglePlay, playPreviewTrack, playing }) => {
    /* hooks */
    useEffect(() => {
        if (audio) {
            if (playing) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [playing]);

    /* functions */

    const restartAudio = () => {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }

    if (!audio) return null;
    return (
        <div style={{ padding: "7px", textAlign: "center" }}>
            <Grid>
                <SkipPreviousIcon
                    className="icons"
                    onClick={playPreviewTrack}
                    fontSize="large" />
                {playing ?
                    <PauseCircleOutlineIcon
                        fontSize="large"
                        className="icons"
                        onClick={() => togglePlay()}
                    /> : <PlayCircleOutlineIcon
                        onClick={() => togglePlay()}
                        className="icons"
                        fontSize="large" />}
                <SkipNextIcon
                    className="icons"
                    onClick={playNextTrack}
                    fontSize="large" />
                <ReplayIcon
                    className="icons"
                    onClick={restartAudio}
                    fontSize="small" />
            </Grid>
        </div>
    )
}

FormControlPlayBar.propTypes = {
    audio: PropTypes.object,
    playPreviewTrack: PropTypes.func,
    playNextTrack: PropTypes.func,
    playing: PropTypes.bool
};

export default FormControlPlayBar;