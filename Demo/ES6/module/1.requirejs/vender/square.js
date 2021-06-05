define(['./multiply'], function(multiplyModule) {
    console.log('Square Module')

    var square = function(x) {
        return multiplyModule.multiply(x, x)
    }

    return {
        square: square
    }
})