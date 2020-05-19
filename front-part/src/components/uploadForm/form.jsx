import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Button, makeStyles, Grid } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import musicUploadActions from '../../redux/music/addMusicUpload';
import SweetAlertCmp from '../ui/alert'


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Form = ({ addMusicUploadReq, response, musicAdded }) => {
    const classes = useStyles();
    /* hooks */
    const [audio, setAudio] = useState(null);
    const [audioSelected, setAudioSelected] = useState(true)
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (musicAdded && musicAdded.data && musicAdded.data.err) {
            setShow(true);
            setMsg(musicAdded.data.err)
        }
    }, [musicAdded]);

    /* function */

    const onUploadFileEvent = ({ target: { files } }) => {
        const audioSel = files[0];
        if (audioSel) {
            setAudioSelected(false);
            setAudio(audioSel);
        }
    }

    const onUploadFileFn = () => {
        const formData = new FormData();
        formData.append('audio', audio);
        formData.append('idUser', response.user._id);
        addMusicUploadReq(formData)
    }

    return (
        <div>
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AudiotrackIcon />
                    </Grid>
                    <Grid item className={classes.file}>
                        <input
                            id="audio-input"
                            type="file"
                            accept="audio/*"
                            onChange={onUploadFileEvent}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                            disabled={audioSelected}
                            onClick={onUploadFileFn}
                        >
                            Upload
                         </Button>
                    </Grid>
                </Grid>
            </div>
            {show &&
                <SweetAlertCmp
                    show={show}
                    type="error"
                    message={msg}
                    toggleShow={() => setShow(false)}
                />}
        </div>
    );
};

Form.propTypes = {
    addMusicUploadReq: PropTypes.func.isRequired,
    response: PropTypes.object,
    musicAdded: PropTypes.object
};

const mapStateToProps = ({ login, music }) => {
    return {
        response: login.signIn.response,
        musicAdded: music.addMusicUpload.response
    }
}
const mapDispatchToProps = dispatch => ({
    addMusicUploadReq: payload => dispatch(musicUploadActions.addMusicUploadRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)