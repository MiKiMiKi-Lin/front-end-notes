
define(function() {
    console.log('Multiply Module')

    var multiply = function(x, y) {
        return x * y
    }

    return {
        multiply: multiply
    }
})