import React from 'react';
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LeftBlock from './leftBlock';
import SignBlock from './signBlock';
import SearchBlock from './searchBlock';
import DetailLogOutBlock from './detailLogOutBlock'

const Header = ({ history, connected, response }) => {
    
    return (
        <header className="nav">
            <Grid container spacing={4} style={{ flexGrow: 1 }}>
                <LeftBlock />
                <SearchBlock />
                {!connected ?
                    <SignBlock history={history} /> :
                    <DetailLogOutBlock user={response.user} />
                }
            </Grid>
        </header>

    )
};

Header.propTypes = {
    history: PropTypes.object
};

const mapStateToProps = ({ login }) => {
    return {
        response: login.signIn.response,
        connected: login.signIn.connected,
    }
}
const mapDispatchToProps = dispatch => ({
    //signInReq: payload => dispatch(loginActions.loginRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)