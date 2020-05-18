import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import InputText from '../../components/ui/input'
import { formElments } from './inputs'

const Form = ({
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
}) => {
    return (
        <Fragment>
            <h2 className="text-center">
                Login
            </h2>
            <div>
                {formElments
                    .filter(el => el)
                    .map((el, index) =>
                        <InputText
                            key={`${el.name}${index}`}
                            onchange={e => fieldChangedHandler(e, el.name)}
                            name={el.name}
                            label={el.label}
                            placeholder={el.placeholder}
                            type={el.type}
                            value={payload[el.name]}
                            errorText={errorsList[el.name]}
                            isError={
                                isError && Object.keys(errorsList).includes(el.name)
                            }
                            required={el.required}
                        />)}
            </div>
        </Fragment>
    )
}

Form.propTypes = {
    payload: PropTypes.object.isRequired,
    isError: PropTypes.bool,
    errorsList: PropTypes.object.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired
}
export default Form

