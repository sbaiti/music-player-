import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import hash from "../../shared/hash";
import GetMusicSpotifyActions from '../../redux/music/getMusicSpotify/index'
import SpinnerDot from '../../components/ui/spinner/spinnerDot'
import CardPlayList from '../../components/playList/cardPlayList'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        flexDirection: 'column',
        display: 'flex',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const PlayerList = ({ getMusicSpotifyReq, playLists }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [token, setToken] = useState(null);
    useEffect(() => {
        let _token = hash.access_token;
        if (_token) {
            getlistMusics(_token);
            setToken(_token);
        }
    }, [])

    const getlistMusics = (token) => {
        getMusicSpotifyReq(token);
    }

    return (
        <div>
            {
                playLists ? (
                    <div className="row" style={{ height: "83vh", overflow: "scroll" }}>
                        <div className="cbs-main-list-item-section-header cbs-clear-fix">
                            <h4 className="main-header ">
                                <span className="ml-4">
                                    Please choose your Play List
                                </span>
                            </h4>
                        </div>
                        <div className="row mt-1">
                            {playLists.map(playList => {
                                return (
                                    <CardPlayList playList={playList} />
                                )
                            })}
                        </div>
                    </div>
                ) :
                    <SpinnerDot />
            }
        </div >
    );
};

PlayerList.propTypes = {
    getMusicSpotifyReq: PropTypes.func.isRequired,
    playLists: PropTypes.object.isRequired
};

const mapStateToProps = ({ music }) => {
    return {
        playLists: music.getMusicSpotify.response,
    }
}
const mapDispatchToProps = dispatch => ({
    getMusicSpotifyReq: payload => dispatch(GetMusicSpotifyActions.getMusicSpotifyRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerList)