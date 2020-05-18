import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, FormHelperText, Fade, Backdrop } from '@material-ui/core';
import PropTypes from 'prop-types';
import ButtonComponent from '../../components/ui/button'
import { useFormFields } from '../../hooks/useFormFields'
import Form from './form';
import loginActions from '../../redux/login/signin/index'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Login = ({ signInReq, response, history, error }) => {
    const classes = useStyles();

    /* hooks */
    const [open, setOpen] = React.useState(true);
    const [fields, fieldChangedHandler] = useFormFields({
        login: "",
        password: ""
    });
    const [errorsList, seterrorsList] = useState({})
    const [isError, setisError] = useState(error);
    const [textErrorLogin, setTextErrorLogin] = useState("");

    /* effects */

    useEffect(() => {
        if (error && response) {
            const errorsList = {}
            const err = response.data
            if (err.err) {
                setTextErrorLogin(err.err);
                return;
            }
            try {
                ["login", "password"].forEach(key => {
                    if (err.includes(key)) {
                        errorsList[key] = err
                        seterrorsList(errorsList);
                        setisError(error)
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
        if (
            !isError && response && response.user
        ) {
            history.push("/")
        }
    }, [response, error])

    /* funtions */

    const handleClose = () => {
        setOpen(false);
    };

    const signInFn = () => {
        signInReq(fields)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Form
                            isError={isError}
                            errorsList={errorsList}
                            payload={fields}
                            fieldChangedHandler={fieldChangedHandler}
                        />
                        <div className="text-center">
                            {textErrorLogin && <FormHelperText
                                style={{ color: "red", textAlign: "center" }}
                            >{textErrorLogin}</FormHelperText>}
                            <ButtonComponent
                                disabled={false}
                                color="secondary"
                                type="contained"
                                size="large"
                                width="97%"
                                label="Sign In"
                                clicked={signInFn}
                            />
                        </div>
                    </div>
                </Fade>

            </Modal>
        </div>
    );
};

Login.propTypes = {
    response: PropTypes.object,
    history: PropTypes.object.isRequired,
    signInReq: PropTypes.func.isRequired
};

const mapStateToProps = ({ login }) => {
    return {
        response: login.signIn.response,
        connected: login.signIn.connected,
        error: login.signIn.error
    }
}
const mapDispatchToProps = dispatch => ({
    signInReq: payload => dispatch(loginActions.loginRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)