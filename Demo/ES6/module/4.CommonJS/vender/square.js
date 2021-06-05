console.log('Square Module')

var multiplyModule = require('./multiply')
var square = function(x) {
    return multiplyModule.multiply(x, x)
}

module.exports = {
    square: square
}
