'use strict'

import oc from './'
import test from 'ava'

const primitives = [null, undefined, '1', 3, Symbol(), false]
const paths = ['', 123, new String('')]
const emptys = [{}, [], Object(), Array()]
const object = {
    a: {
        b: null,
        c: undefined,
        d: 123,
        e: 'hello appolo!',
        f: [
            {
                g: 123,
                h: {
                    m: 'hello world'
                },
                l: () => 'hello poppy!',
                s: () => 'hello baidu!',
                v: x => ({
                    z: x
                })
            }
        ]
    }
}

for(const [_, val] of primitives.entries()) {
    test(`If your first argument passed a primitive type (eg:${typeof val === 'symbol' ? 'symbol' : val}）, will return undefined`, t => {
        const target = oc(val)
        t.is(target, undefined)
    })
}

for(const [_, val] of paths.entries()) {
    test(`If your second argument passed a empty str or other type (eg:${typeof val})parameter, will return undefined`, t => {
        const target = oc(object, val)
        t.is(target, undefined)
    })
}

for(const [_, val] of emptys.entries()) {
    test(`if you pass a empty val like ${JSON.stringify(val) + _} parameter, will return undefined`, t => {
        const target = oc(val)
        t.is(target, undefined)
    })
}

test('If your secod argument passed a illegal path (eg: "abc"), will return undefined', t => {
    const target = oc(object, 'abc')
    t.is(target, undefined);
})

test('optional chaining test', t => {
    const t1 = oc(object, 'a?')
    t.is(t1, object['a'])

    const t2 = oc(object, 'a.b?.NOT_REAL')
    t.is(t2, undefined)

    const t3 = oc(object, 'a?.b')
    t.is(t3, undefined)

    const t4 = oc(object, 'a?.["e"]')
    t.is(t4, 'hello appolo!')

    const t5 = oc(object, 'a?.f[0]?.g')
    t.is(t5, 123)

    const t6 = oc(object, 'a?.f?.[0]?.g')
    t.is(t6, 123)

    const t7 = oc(object, 'a?.f?.[0]?.l?.()')
    t.is(t7, 'hello poppy!')

    const t8 = oc(object, 'a?.f?.[0]?.s()')
    t.is(t8, 'hello baidu!')
})

test('return a default value', t => {
    const t1 = oc(object, 'a?.b?', 'hello world!')
    t.is(t1, 'hello world!')
})

test('stacking support test', t => {
    const t1 = oc(object, 'a?.f?.[0]?.v?.("hello!")?.z')
    t.is(t1, 'hello!')

    const x = 'hello ABC!'
    const t2 = oc(object, `a?.f?.[0]?.v?.("${x}")?.z`)
    t.is(t2, 'hello ABC!')
})