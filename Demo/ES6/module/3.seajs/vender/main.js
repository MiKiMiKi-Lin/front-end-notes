define(function(require, exports, module) {
    var addModule = require('./add')
    console.log(addModule.add(1, 2))
    var squareModule = require('./square')
    console.log(squareModule.square(5))
})