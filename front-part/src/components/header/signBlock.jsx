import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignBlock = () => {
    return (
        <Grid item xs={12} lg={4}>
            <div className="right">
                <li>
                    <Link to='/login' className="border">Sign In</Link>
                </li>
                <li>
                    or
                </li>

                <li>
                    <Link to="/signup" className="orange"> Create Account </Link>
                </li>

                <li>
                    <a>Upload</a>
                </li>
            </div>
        </Grid>
    );
};

export default SignBlock;