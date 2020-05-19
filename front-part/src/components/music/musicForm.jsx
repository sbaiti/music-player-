import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MusicForm = ({ track, selecteTrack, index }) => {
    return (
        <Fragment>
            <span className="circle" onClick={() => selecteTrack(track, index)}>
                <span className="">{track.file.substring(0, 10)}</span>
            </span>
        </Fragment>
    );
};

MusicForm.propTypes = {
    track: PropTypes.object.isRequired,
    selecteTrack: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default MusicForm;