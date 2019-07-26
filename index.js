'use strict'

const OP_REG = /\?\./
const DYNAMIC_PROP_REG = /^(\[[^\]]*\]|\([^\)]*\))$/
const LAST_Q = /\?$/
const UNDEFINED = void 0

// In actual business development, most of them are processed for objects and arrays.
const isPrimitive = t => t !== Object(t)
const stringify = t => JSON.stringify(t)
const isEmpty = t => stringify(t) === '[]' || stringify(t) === '{}'

/**
 * wow, optional chaining
 * @param {array | object} obj the object we want add some magic.
 * @param {string} path identifier resolution path
 * @param {any} dv defaultvalue to fallback
 */
const oc = (obj, path, dv) => {

    // some pre-check
    if (isPrimitive(obj) || isEmpty(obj)) return UNDEFINED
    if (typeof path !== 'string' || !Boolean(path)) return UNDEFINED

    // all the access identify
    const accesses = path.replace(LAST_Q, '').split(OP_REG)
    const { length } = accesses

    // attribute access string
    let str = 'obj'
    for (let i = 0; i < length; i++) {
        const prop = accesses[i];
        const propStr = DYNAMIC_PROP_REG.test(prop) ? `${prop}` : `.${prop}`
        str = str.replace(/^/, '(')
        str += ` || {})${propStr}`
    }

    const _find = eval(`((obj) => ${str})`)

    return _find(obj) || dv
}

module.exports = oc
module.exports.default = oc