import React, { Fragment } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import PropTypes from 'prop-types'

const SweetAlertCmp = ({ show, message, toggleShow, type }) => {
    
    return (
        <Fragment>
            {
                type === 'error' ?
                    <SweetAlert
                        show={show}
                        title='Erreur'
                        error
                        onConfirm={() => toggleShow()}
                    >
                        {message}
                    </SweetAlert> :
                    <SweetAlert
                        show={show}
                        title='Success'
                        success
                        onConfirm={() => toggleShow()}
                    >
                        {message}
                    </SweetAlert>
            }
        </Fragment>
    );
}

SweetAlertCmp.protypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    toggleShow: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default SweetAlertCmp;