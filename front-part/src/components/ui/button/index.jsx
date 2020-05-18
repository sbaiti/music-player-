import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

const ButtonComponent = props => {
    const classes = useStyles();
    const { label, type, color, clicked, size, disabled, width } = props
    return (
        <div>

            <Button
                variant={type}
                color={color}
                size={size}
                style={{ width: width }}
                onClick={() => clicked()}
                disabled={disabled}
                className={classes.root}
            >
                {label}
            </Button>
        </div>
    )
}

ButtonComponent.defaultProps = {
    type: 'text',
    label: '',
    width: "300px",
    color: 'primary',
    size: 'medium',
    disabled: false,
}

ButtonComponent.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    width: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    clicked: PropTypes.func,
}
export default ButtonComponent
