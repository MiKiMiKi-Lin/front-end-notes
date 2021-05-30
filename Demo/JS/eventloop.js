function multiply(a, b) {
    return a * b
}

function square(a) {
    return multiply(a, a)
}

function printSquare(a) {
    let result = square(a)
    console.log(result)
}

printSquare(10)