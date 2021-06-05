define(['./add', './square'], function(addModule, squareModule) {
    console.log(addModule.add(1, 2))
    console.log(squareModule.square(5))
})