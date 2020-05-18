import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const LeftBlock = () => {
    return (
        <Grid item xs={12} md={4}>
            <div className="left">
                <li className="logo">
                    <Link to="/">Play Music</Link>
                </li>
            </div>
        </Grid>
    );
};

export default LeftBlock;