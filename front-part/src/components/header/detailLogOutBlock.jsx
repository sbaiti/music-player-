import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DetailLogOutBlock = ({ user, logout }) => {
    const { lastName, firstName } = user;

    return (
        <Grid item xs={12} lg={4}>
            <div className="right">
                <li>
                    Welcome !
                </li>
                <li>
                    {`${firstName} ${lastName}`}
                </li>
                <li>
                    <Link to="/" className="orange" onClick={() => logout()}> Sign Out </Link>
                </li>
            </div>
        </Grid>
    );
};

const mapStateToProps = () => ({
})

DetailLogOutBlock.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch({
            type: 'SIGNOUT_REQUEST',
        })
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)((DetailLogOutBlock))