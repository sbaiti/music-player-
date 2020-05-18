export default function generateKey() {
    const uuid = require('uuid/v1')
    const id = uuid()
    return id
}


// Validation
export const isEmpty = value =>
    value === undefined || value === null || value === ''

/**
 * validate email
 *
 * @param {string} 
 * @returns {boolean} mail valid
 */

export function isValidEmail(value) {
    if (
        !isEmpty(value) &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
        return false
    }
    return true
}