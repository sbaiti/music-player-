import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import _ from "lodash";
import Form from '../../components/uploadForm/form'
import getAllUploadMusicActions from '../../redux/music/getAllUploadMusic'
import MusicForm from '../../components/music/musicForm'
import ChangeCurrentTrackActions from '../../redux/music/changeCurrentTrackPlay/index'
import SweetAlertCmp from '../../components/ui/alert'

const UploadMusic = ({ getAllUploadMusicReq, connected, musicTracks, changeCurrentTrackReq, history }) => {
    /* hooks */
    const [data, setData] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);

    useEffect(() => { getAllUploadMusicReq() }, [])
    useEffect(() => {
        if (musicTracks && !_.isEqual(musicTracks.musics, data)) {
            setData(musicTracks.musics)
        }
    }, [musicTracks]);

    const selecteTrackFn = (track, index) => {
        setSelectedTrack(track)
        changeCurrentTrackReq(index)
        history.push("/player-music")
    }
    console.log(selectedTrack);
    return (
        <div>
            {connected ?
                <div>
                    <div>
                        <Form />
                    </div>
                    <div className="row" style={{
                        height: "60vh", overflowX: "scroll", alignContent: "center", justifyContent: "space-between"
                    }}>
                        {
                            data &&
                            data.map((track, index) => {
                                return (
                                    <MusicForm
                                        key={track._id}
                                        index={index}
                                        track={track}
                                        selecteTrack={selecteTrackFn}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                : <SweetAlertCmp
                    type="error"
                    message="You should connect before !"
                    toggleShow={() => history.push("/login")}
                />
            }
        </div>
    );
};

UploadMusic.propTypes = {
    musicTracks: PropTypes.object,
    history: PropTypes.object.isRequired,
    getAllUploadMusicReq: PropTypes.func,
    changeCurrentTrackReq: PropTypes.func,
    connected: PropTypes.bool
};

const mapStateToProps = ({ music, login }) => ({
    musicTracks: music.getAllUploadMusic.response,
    connected: login.signIn.connected
})

const mapDispatchToProps = dispatch => ({
    getAllUploadMusicReq: () => dispatch(getAllUploadMusicActions.getAllUploadMusicRequest()),
    changeCurrentTrackReq: (track) => dispatch(ChangeCurrentTrackActions.changeCurrentTrack(track))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadMusic);