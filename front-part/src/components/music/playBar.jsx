import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ProgressBar from './pregressBar';
import FormControlPlayBar from './formControlPlayBar';
import url from '../../server/baseUrl.json'
import ChangeCurrentTrackActions from '../../redux/music/changeCurrentTrackPlay/index'
import PlayListAnimation from '../ui/animations/playListAnimation'

class Playbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: null,
            musicTracks: props.musicTracks,
            index: props.index,
            track: props.musicTracks.musics[props.index],
            playing: true
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { index } = prevState;
        if (nextProps.index !== index) {
            return {
                index: nextProps.index
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { musicTracks } = prevProps;
        if (prevProps.index !== this.props.index) {
            this.setState({
                track: musicTracks.musics[this.props.index],
            });
        }
    }

    updateProgress = () => {
        this.setState({ currentTime: this.audioTag.currentTime })
    }

    playNextTrack = () => {
        const { changeCurrentTrackReq, musicTracks, index } = this.props;
        if (index === musicTracks.musics.length - 1)
            changeCurrentTrackReq(0)
        else
            changeCurrentTrackReq(index + 1)
    }

    playPreviewTrack = () => {
        const { changeCurrentTrackReq, musicTracks, index } = this.props;
        if (index === 0)
            changeCurrentTrackReq(musicTracks.musics.length - 1)
        else
            changeCurrentTrackReq(index - 1)
    }

    render() {
        const track = this.state.track;
        if (!track) return (<div></div>);
        const { playing } = this.state;
        return (
            <div>
                <PlayListAnimation playing={playing} />
                <div className="playbar">
                    <audio id='audio' autoPlay preload="auto"
                        src={`${url.REACT_APP_BASE_URL}music/musicsByName?audio=` + track.file}
                        type="audio/mpeg"
                        ref={(tag) => this.audioTag = tag}
                        onTimeUpdate={this.updateProgress}
                        onEnded={this.playNextTrack}
                    />

                    <FormControlPlayBar
                        audio={this.audioTag}
                        playing={playing}
                        togglePlay={() => this.setState({ playing: !playing })}
                        playNextTrack={this.playNextTrack}
                        playPreviewTrack={this.playPreviewTrack}
                    />

                    <ProgressBar audio={this.audioTag} />
                    {track.file}
                </div>
            </div>
        )
    }
}

Playbar.propTypes = {
    musicTracks: PropTypes.object,
    history: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    changeCurrentTrackReq: PropTypes.func
};

const mapStateToProps = ({ music }) => ({
    musicTracks: music.getAllUploadMusic.response,
    index: music.getCurrentTrackPlay.track
})

const mapDispatchToProps = dispatch => ({
    changeCurrentTrackReq: (track) => dispatch(ChangeCurrentTrackActions.changeCurrentTrack(track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playbar);
