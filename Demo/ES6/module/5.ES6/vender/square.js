console.log('Square Module')

import { multiply } from './multiply.js'

var square = function(x) {
    return multiply(x, x)
}

export {
    square
}
