import React from 'react';
import PropTypes from 'prop-types';
import { formatDuration } from '../../shared/utility';

const ProgressBar = ({ audio }) => {
    if (!audio) return null;
    const progress = formatDuration(Math.floor(audio.currentTime));
    const duration = audio.duration ? formatDuration(Math.floor(audio.duration)) : "0:00";

    return (
        <ul className="progress">
            <li id="currentTime">
                {progress}
            </li>

            <progress
                value={audio.currentTime}
                max={audio.duration} />
            <li>
                {duration}
            </li>
        </ul>
    )
}

ProgressBar.propTypes = {
    audio: PropTypes.object,
    history: PropTypes.object,
    index: PropTypes.number,
    changeCurrentTrackReq: PropTypes.func
};

export default ProgressBar;