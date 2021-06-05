define(function(require, exports, module) {
    console.log('Add Module')

    var add = function(x, y) {
        return x + y
    }

    module.exports = {
        add: add
    }
})