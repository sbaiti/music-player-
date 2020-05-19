import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';

class FormControlPlayBar extends React.Component {
    constructor(props) {
        super(props)

        document.body.addEventListener('keypress', (e) => {
            if (e.key === " " && (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA")) {
                e.preventDefault();
                this.togglePlay();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.audio) return null;

        if (nextProps.playing) {
            this.props.audio.play();
        } else {
            this.props.audio.pause();
        }
    }

    restartAudio = () => {
        this.props.audio.pause();
        this.props.audio.currentTime = 0;
        this.props.audio.play();
    }

    togglePlay = () => {
        this.props.togglePlay();
    }

    toggleLoop = () => {
        this.props.audio.loop = !this.props.audio.loop;
    }

    render() {
        if (!this.props.audio) return null;
        const togglePlayButton = this.props.playing ?
            <PauseCircleOutlineIcon
                fontSize="large"
                className="icons"
                onClick={this.togglePlay}
            /> : <PlayCircleOutlineIcon
                onClick={this.togglePlay}
                className="icons"
                fontSize="large" />;

        return (
            <div style={{ padding: "7px", textAlign: "center" }}>
                <Grid>
                    <SkipPreviousIcon
                        className="icons"
                        onClick={this.props.playPreviewTrack}
                        fontSize="large" />
                    {togglePlayButton}
                    <SkipNextIcon
                        className="icons"
                        onClick={this.props.playNextTrack}
                        fontSize="large" />
                    <ReplayIcon
                        className="icons"
                        onClick={this.restartAudio}
                        fontSize="meduim" />
                </Grid>
            </div>
        )
    }
}

FormControlPlayBar.propTypes = {
    audio: PropTypes.object
};

export default FormControlPlayBar;