# optional-chaining-tool

[![Build Status](https://travis-ci.org/cbbfcd/optional-chian.svg?branch=master)](https://travis-ci.org/cbbfcd/optional-chian)
[![Coverage Status](https://coveralls.io/repos/github/cbbfcd/optional-chian/badge.svg?branch=master)](https://coveralls.io/github/cbbfcd/optional-chian?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/cbbfcd/optional-chian.svg)](https://greenkeeper.io/)

a simple optional chaining tools for javascript.

## use

```
import oc from 'optional-chaining-tool'

oc(object, 'a?')
oc(object, 'a?.["e"]')
oc(object, 'a?.f?.[0]?.l?.()')
oc(object, 'a?.f?.[0]?.v?.("hello!")?.z')
```

you can get more use case in [test.js](./test.js)

*not support Short-circuiting*

## option

stage 3 🎆🎆!!!

[proposal-optional-chaining](https://github.com/tc39/proposal-optional-chaining)

so, you maybe just need a babel-plugin about this proposal.


## license

MIT