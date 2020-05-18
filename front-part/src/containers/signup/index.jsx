import React from 'react'
import { Grid, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReCAPTCHA from 'react-google-recaptcha'
import _ from "lodash";
import ButtonComponent from '../../components/ui/button'
import addUserActions from '../../redux/user/addUser'
import SITE_KEY from '../../shared/constants'
import SweetAlertCmp from '../../components/ui/alert'
import Form from './form'

class Signup extends React.Component {
    static defaultProps = {
        response: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            captchaError: null,
            disable: true,
            isError: false,
            errorsList: {},
            show: false,
            response: props.response,
            payload: {
                firstName: '',
                lastName: '',
                login: '',
                email: '',
                password: ''
            }
        }
    }

    /* life cycle Cmp */

    static getDerivedStateFromProps(nextProps, prevState) {
        const { response, error } = nextProps;
        if (!_.isEqual(response, prevState.response)) {
            return {
                response,
                isError: error
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        const { response, isError } = this.state;
        if (!_.isEqual(response, prevProps.response)) {
            if (isError && response) {
                const errorsList = {}
                const err = response.data
                if (err.err)
                    this.setState({ msg: err.err, show: true, typeAlert: 'error' })
                try {
                    ["firstName", "lastName", "email", "login", "password"].forEach(key => {
                        if (err.includes(key)) {
                            errorsList[key] = err
                            this.setState({ errorsList })
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
            }
            if (
                !isError && response && response.user
            ) {
                this.setState({
                    typeAlert: "success",
                    show: true,
                    msg: `${response.msg} \n You can connect now !`,
                    payload: {
                        firstName: '',
                        lastName: '',
                        login: '',
                        email: '',
                        password: '',
                    },
                })

            }
        }
    }

    /* funtions */

    /**
     * field Changed Handler
     *
     * @memberof Signup
     */
    fieldChangedHandler = (e, name) => {
        const { payload } = this.state
        const { password } = payload;
        const newPayload = { ...payload }
        this.setState({
            payload: { ...newPayload, [name]: e.target.value }
        });
        if (name === "confirmPassword") {
            if (e.target.value === password)
                this.setState({ disable: false })
            else
                this.setState({ disable: true })
        }
    }

    /**
     * Add User
     *
     * @memberof Signup
     */
    addUser = () => {
        const { signupReq } = this.props
        const { payload } = this.state
        if (!this.captchaValue) {
            this.setState({ captchaError: true })
            return
        }
        const newPayload = { ...payload }
        delete newPayload.confirmPassword;
        signupReq(newPayload)
    }

    /**
     * on change captcha
     *
     * @memberof Signup
     */
    onChange = value => {
        this.captchaValue = value
    }

    /**
     * Render
     *
     * @returns
     * @memberof Signup
     */
    render() {
        const { history } = this.props
        const {
            disable,
            captchaError,
            payload,
            isError,
            errorsList,
            show,
            msg,
            typeAlert
        } = this.state
        return (
            <FormGroup>
                <div>
                    <Grid container>
                        <Form
                            payload={payload}
                            isError={isError}
                            errorsList={errorsList}
                            fieldChangedHandler={this.fieldChangedHandler}
                        />
                    </Grid>

                    <div style={{ padding: '20px 33% 0px' }}>
                        <ReCAPTCHA
                            sitekey={SITE_KEY}
                            onChange={this.onChange}
                            onExpired={() => {
                                this.captchaValue = null
                            }}
                            onErrored={() => {
                                this.captchaValue = null
                            }}
                        />
                        {captchaError && !this.captchaValue && (
                            <small className="text-danger">
                                captchaError
                            </small>
                        )}
                    </div>

                    <div className="d-flex justify-content-around p-4 text-center ">
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            label="Cancel"
                            size="large"
                            clicked={() => {
                                history.goBack()
                            }}
                        />
                        <ButtonComponent
                            disabled={disable}
                            color="secondary"
                            type="contained"
                            size="large"
                            label="Create Account"
                            clicked={this.addUser}
                        />
                    </div>
                </div>
                {show &&
                    <SweetAlertCmp
                        show={show}
                        type={typeAlert}
                        message={msg}
                        toggleShow={() => this.setState({ show: false })}
                    />}
            </FormGroup>
        )
    }
}

Signup.propTypes = {
    response: PropTypes.object,
    history: PropTypes.object.isRequired,
    signupReq: PropTypes.func.isRequired
}

const mapStateToProps = ({ user }) => {
    return {
        response: user.addUser.response,
        error: user.addUser.error
    }
}
const mapDispatchToProps = dispatch => ({
    signupReq: payload => dispatch(addUserActions.addUserRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)